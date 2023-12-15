package service

import repository.MongoDb
import scala.concurrent.ExecutionContext
import javax.inject._
import akka.compat.Future
import scala.concurrent.Future
import model.Response._
import java.text.SimpleDateFormat
import model.Source._
import model.AnalyzedPost
import model.SourceResponse

@Singleton
class AggregationService @Inject() (implicit
    ec: ExecutionContext,
    val repo: MongoDb
) {
  def aggregateData(
      startDate: Option[String],
      endDate: Option[String]
  ): Future[model.Response] = {
    val tagesschauFuture =
      new CollectionService(Tagesschau).getPostsByDateRange(startDate, endDate)
    val redditFuture =
      new CollectionService(Reddit).getPostsByDateRange(startDate, endDate)

    val allDataFuture = for {
      tagesschauData <- tagesschauFuture
      redditData <- redditFuture
    } yield (tagesschauData, redditData)

    allDataFuture.map {
      case (
            tagesschauDocs: Seq[AnalyzedPost],
            redditPosts: Seq[AnalyzedPost]
          ) =>
        val allPosts: Seq[AnalyzedPost] = tagesschauDocs ++ redditPosts

        val totalArticles = allPosts.size
        val totalCategories = allPosts.map(_.category).distinct.size

        val sources =
          allPosts
            .groupBy(_.source)
            .map { case (source, sourcePosts: Seq[AnalyzedPost]) =>
              val articleCount: Int = sourcePosts.size
              val articlePerc: Double =
                articleCount.toDouble / totalArticles * 100.0

              val categoryCount = sourcePosts.map(_.category).distinct.size
              val posArticles = sourcePosts.count(_.result == "positive")
              val posArticlesPerc = posArticles.toDouble / articleCount * 100.0
              val negArticles = sourcePosts.count(_.result == "negative")
              val negArticlesPerc = negArticles.toDouble / articleCount * 100.0

              val categories = sourcePosts.groupBy(_.category)
                .map { case (category, categoryPosts) =>
                  val count = categoryPosts.size
                  val posCount = categoryPosts.count(_.result == "positive")
                  val posPerc = posCount.toDouble / count * 100.0
                  val negCount = categoryPosts.count(_.result == "negative")
                  val negPerc = negCount.toDouble / count * 100.0
                  model.Category(
                    category,
                    count,
                    posCount,
                    posPerc,
                    negCount,
                    negPerc
                  )
                }
                .toSeq

              SourceResponse(
                name = source,
                articleCount = articleCount,
                articlePerc = articlePerc,
                categoryCount = categoryCount,
                posArticles = posArticles,
                posArticlesPerc = posArticlesPerc,
                negArticles = negArticles,
                negArticlesPerc = negArticlesPerc,
                categories = categories
              )
            }
            .toSeq

          model.Response(totalArticles, totalCategories, sources)
    }
  }
}
