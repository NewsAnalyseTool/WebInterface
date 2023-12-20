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
import reactivemongo.api.bson.BSONDocument
import model.Response
import model.Category
import java.util.Date

@Singleton
class AggregationService @Inject() (implicit
    ec: ExecutionContext,
    val repo: MongoDb
) {
  // convert string to Date object
  def stringToDate(date: String): Date = {
    val dateformat = new SimpleDateFormat("yyyy-MM-dd")
    dateformat.parse(date)
  }

  def aggregateData(
      startDate: String,
      endDate: String
  ): Future[Response] = {

    val start = stringToDate(startDate)
    val end = stringToDate(endDate)

    // document futures in a constrained date range
    val tagesschauFuture = repo.getByDateRange(start, end, Tagesschau)
    val redditFuture = repo.getByDateRange(start, end, Reddit)

    // extract the seq of documents from the futures
    val allDataFuture: Future[(Seq[AnalyzedPost], Seq[AnalyzedPost])] = for {
      tagesschauData: Seq[AnalyzedPost] <- tagesschauFuture
      redditData: Seq[AnalyzedPost] <- redditFuture
    } yield (tagesschauData, redditData)

    // compute statistics for the controller (https://github.com/SearchTrendAnalyseTool/Documentation/wiki/WebInterface-Documentation)
    allDataFuture.map {
      case (
            tagesschauDocs: Seq[AnalyzedPost],
            redditPosts: Seq[AnalyzedPost]
          ) =>
        // combine all data together
        val allPosts: Seq[AnalyzedPost] = tagesschauDocs ++ redditPosts

        val totalArticles = allPosts.size
        val totalCategories = allPosts.map(_.category).distinct.size

        // building the source structure
        val sources =
          allPosts
            .groupBy(_.source)
            .map { case (source, sourcePosts: Seq[AnalyzedPost]) =>
              val articleCount: Int = sourcePosts.size
              val articlePerc: Double =
                articleCount.toDouble / totalArticles * 100.0

              val categoryCount = sourcePosts.map(_.category).distinct.size
              val posArticles: Int = sourcePosts.count(_.result == "positive")
              val posArticlesPerc: Double =
                posArticles.toDouble / articleCount * 100.0
              val negArticles: Int = sourcePosts.count(_.result == "negative")
              val negArticlesPerc: Double =
                negArticles.toDouble / articleCount * 100.0

              // building the category structure
              val categories = sourcePosts
                .groupBy(_.category)
                .map { case (category, categoryPosts) =>
                  val count: Int = categoryPosts.size
                  val posCount: Int =
                    categoryPosts.count(_.result == "positive")
                  val posPerc: Double = posCount.toDouble / count * 100.0
                  val negCount: Int =
                    categoryPosts.count(_.result == "negative")
                  val negPerc: Double = negCount.toDouble / count * 100.0
                  Category(
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
        Response(totalArticles, totalCategories, sources)
    }
  }

}
