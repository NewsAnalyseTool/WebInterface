package service

import repository.MongoDb
import scala.concurrent.ExecutionContext
import javax.inject._
import scala.concurrent.Future
import java.text.SimpleDateFormat
import model.Source._
import reactivemongo.api.bson.BSONDocument
import model.{
  Source,
  Response,
  Category,
  AnalyzedPost,
  SourceResponse,
  Sentiment,
  Bar,
  BarChartResponse
}
import java.util.Date
import scala.collection.immutable
import scala.collection.MapView
import play.api.libs.json.OFormat
import play.api.libs.json.Json
import java.util.Calendar

@Singleton
class AggregationService @Inject() (implicit
    ec: ExecutionContext,
    val repo: MongoDb
) {

  // change to all sources in production
  // val sources: Seq[Value] = Source.values.toSeq
  private val sources = Seq(Reddit, Tagesschau)

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

    val dataFutures =
      sources.map(source => repo.getByDateRange(start, end, source))

    // extract the seq of documents from the futures
    val allDataFuture: Future[Seq[Seq[AnalyzedPost]]] =
      Future.sequence(dataFutures)

    // compute statistics for the controller (https://github.com/SearchTrendAnalyseTool/Documentation/wiki/WebInterface-Documentation)
    allDataFuture.map { allData: Seq[Seq[AnalyzedPost]] =>
      // combine all data together
      val allPosts: Seq[AnalyzedPost] = allData.flatten

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
            val posArticles: Int =
              sourcePosts.count(_.result == Sentiment.positive)
            val posArticlesPerc: Double =
              posArticles.toDouble / articleCount * 100.0
            val negArticles: Int =
              sourcePosts.count(_.result == Sentiment.negative)
            val negArticlesPerc: Double =
              negArticles.toDouble / articleCount * 100.0

            // building the category structure
            val categories = sourcePosts
              .groupBy(_.category)
              .map { case (category, categoryPosts) =>
                val count: Int = categoryPosts.size
                val posCount: Int =
                  categoryPosts.count(_.result == Sentiment.positive)
                val posPerc: Double = posCount.toDouble / count * 100.0
                val negCount: Int =
                  categoryPosts.count(_.result == Sentiment.negative)
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

  // collect the trends for all sources
  def getTrendForEachSource(
      startDate: String,
      endDate: String
  ): Future[Seq[BarChartResponse]] = {
    val futures: Seq[Future[BarChartResponse]] =
      sources.map(source => groupByDayAndSentiment(startDate, endDate, source))
    Future.sequence(futures)
  }

  def groupByDayAndSentiment(
      startDate: String,
      endDate: String,
      source: Source
  ): Future[BarChartResponse] = {

    val start = stringToDate(startDate)
    val end = stringToDate(endDate)

    val dataFuture: Future[Seq[AnalyzedPost]] =
      repo.getByDateRange(start, end, source)

    dataFuture.map { allData: Seq[AnalyzedPost] =>
      // combine the data by day
      val byDate: Map[(Int, Int, Int), Seq[AnalyzedPost]] =
        allData.groupBy(post => {
          val timeInMs = post.date.getTime()
          val calendar = Calendar.getInstance()
          calendar.setTimeInMillis(timeInMs)
          (
            calendar.get(Calendar.DAY_OF_MONTH),
            calendar.get(Calendar.MONTH) + 1,
            calendar.get(Calendar.YEAR)
          )
        })

      // results are grouped by date
      val bars: Seq[Bar] = byDate.map { case ((day, month, year), posts) =>
        val groupedByResult: Map[String, Int] =
          posts
            .groupBy(_.result)
            .view
            .mapValues(_.size)
            .toMap

        val bar: Bar = Bar(
          date = s"$year-$month-$day",
          groupedByResult.get(Sentiment.positive).getOrElse(0),
          groupedByResult.get(Sentiment.negative).getOrElse(0),
          groupedByResult.get(Sentiment.neutral).getOrElse(0)
        )
        bar
      }.toSeq
      BarChartResponse(source.toString, bars)
    }
  }
}
