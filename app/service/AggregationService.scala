package service

import model.AnalyzedPost
import model.Category
import model.Datapoint
import model.DatapointChartResponse
import model.GeneralDataResponse
import model.Sentiment
import model.Source
import model.Source._
import model.SourceResponse
import play.api.libs.json.Json
import play.api.libs.json.OFormat
import reactivemongo.api.bson.BSONDocument
import repository.MongoDb

import java.util.Calendar
import javax.inject._
import scala.collection.MapView
import scala.collection.immutable
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import java.text.SimpleDateFormat
import java.util.Date

/** service layer which takes care of aggregating the different statistics the
  * user is interested in
  *
  * @param ec
  * @param repo
  *   data access layer which retrieves the needed data
  */
@Singleton
class AggregationService @Inject() (implicit
    ec: ExecutionContext,
    val repo: MongoDb
) {

  val sources: Seq[Value] = Source.values.toSeq

  private def stringToDate(date: String): Date = {
    val dateformat = new SimpleDateFormat("yyyy-MM-dd")
    dateformat.parse(date)
  }

  /** gather the data for the general response
    *
    * @param startDate
    * @param endDate
    * @return
    */
  def aggregateGeneralStats(
      startDate: String,
      endDate: String
  ): Future[GeneralDataResponse] = {

    val start = stringToDate(startDate)
    val end = stringToDate(endDate)

    val dataFutures =
      sources.map(source => repo.getByDateRange(start, end, source))

    // extract the seq of documents from the futures
    val allDataFuture: Future[Seq[Seq[AnalyzedPost]]] =
      Future.sequence(dataFutures)

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
              round(articleCount.toDouble / totalArticles * 100.0)
            val categoryCount = sourcePosts.map(_.category).distinct.size
            val posArticles: Int =
              sourcePosts.count(_.result == Sentiment.positive)
            val posArticlesPerc: Double =
              round(posArticles.toDouble / articleCount * 100.0)
            val neuArticles: Int =
              sourcePosts.count(_.result == Sentiment.neutral)
            val neuArticlesPerc: Double =
              round(neuArticles.toDouble / articleCount * 100.0)
            val negArticles: Int =
              sourcePosts.count(_.result == Sentiment.negative)
            val negArticlesPerc: Double =
              round(negArticles.toDouble / articleCount * 100.0)

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
              neuArticles = neuArticles,
              neuArticlesPerc = neuArticlesPerc,
              negArticles = negArticles,
              negArticlesPerc = negArticlesPerc,
              categories = categories
            )
          }
          .toSeq
      GeneralDataResponse(totalArticles, totalCategories, sources)
    }
  }

  private def round(number: Double): Double = {
    BigDecimal(number).setScale(2, BigDecimal.RoundingMode.HALF_UP).toDouble
  }

  /** collect trends for all sources
    *
    * @param startDate
    * @param endDate
    * @return
    */
  def getTrendForEachSource(
      startDate: String,
      endDate: String
  ): Future[Seq[DatapointChartResponse]] = {
    val futures: Seq[Future[DatapointChartResponse]] =
      sources.map(source => groupByDayAndSentiment(startDate, endDate, source))
    Future.sequence(futures)
  }

  private def groupByDayAndSentiment(
      startDate: String,
      endDate: String,
      source: Source
  ): Future[DatapointChartResponse] = {

    val start = stringToDate(startDate)
    val end = stringToDate(endDate)

    val dataFuture: Future[Seq[AnalyzedPost]] =
      repo.getByDateRange(start, end, source)

    dataFuture.map { allData: Seq[AnalyzedPost] =>
      // combine the data by day
      val byDate: Map[(Int, Int, Int, Long), Seq[AnalyzedPost]] =
        allData.groupBy(post => {
          val timeInMs = post.date.getTime()
          val calendar = Calendar.getInstance()
          calendar.setTimeInMillis(timeInMs)
          (
            calendar.get(Calendar.DAY_OF_MONTH),
            calendar.get(Calendar.MONTH) + 1,
            calendar.get(Calendar.YEAR),
            timeInMs
          )
        })

      // results are grouped by date
      val bars: Seq[Datapoint] = byDate
        .map { case ((day, month, year, timeInMs), posts) =>
          val groupedByResult: Map[String, Int] =
            posts
              .groupBy(_.result)
              .view
              .mapValues(_.size)
              .toMap

          val bar: Datapoint = Datapoint(
            date = s"$year-$month-$day",
            groupedByResult.get(Sentiment.positive).getOrElse(0),
            groupedByResult.get(Sentiment.negative).getOrElse(0),
            groupedByResult.get(Sentiment.neutral).getOrElse(0),
            timeInMs
          )
          bar
        }
        .toSeq
        .sortBy(_.timeInMs)
      DatapointChartResponse(source.toString, bars)
    }
  }
}
