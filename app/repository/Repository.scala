package repository

import play.modules.reactivemongo._
import reactivemongo.api._
import reactivemongo.api.bson.BSONDocument
import reactivemongo.api.bson.collection.BSONCollection

import javax.inject.Inject
import javax.inject.Singleton
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import reactivemongo.play.json.compat._
import model.AnalyzedPost
import reactivemongo.api.bson.BSONString
import reactivemongo.api.bson.BSONDateTime
import java.util.Date
import model.Source._
import reactivemongo.api.bson.BSONArray

/** data access layer to access MongoDB
  *
  * @param ec
  * @param tagesschauApi
  *   Tagesschau DB connection details
  * @param redditApi
  *   Reddit DB connection details
  * @param bbcApi
  *   BBC DB connection details
  */
@Singleton
class MongoDb @Inject() (implicit
    ec: ExecutionContext,
    @NamedDatabase("tagesschau") val tagesschauApi: ReactiveMongoApi,
    @NamedDatabase("reddit") val redditApi: ReactiveMongoApi,
    @NamedDatabase("bbc") val bbcApi: ReactiveMongoApi
) {

  private def getCollection(source: Source): Future[BSONCollection] = {

    source match {
      case Tagesschau =>
        tagesschauApi.database.map(
          _.collection("tagesschauAnalysis")
        )
      case Bbc =>
        bbcApi.database.map(
          _.collection("bbcAnalysis")
        )
      case Reddit =>
        redditApi.database.map(
          _.collection("redditAnalysis")
        )
    }
  }

  /** retrieve all data for a single source
    *
    * @param source
    * @return
    *   sequence of posts from the MongoDB
    */
  def getAll(source: Source): Future[Seq[AnalyzedPost]] = {
    getCollection(source)
      .flatMap(
        _.find(BSONDocument())
          .cursor[AnalyzedPost](ReadPreference.primaryPreferred)
          .collect[Seq](-1, Cursor.FailOnError[Seq[AnalyzedPost]]())
      )
  }

  /** retrieve data in a certrain date range for a certain source
    *
    * @param start
    * @param end
    * @param source
    * @return
    */
  def getByDateRange(
      start: Date,
      end: Date,
      source: Source
  ): Future[Seq[AnalyzedPost]] = {

    val query = BSONDocument(
      "date" -> BSONDocument(
        "$gte" -> BSONDateTime(start.getTime()),
        "$lte" -> BSONDateTime(end.getTime())
      )
    )

    getCollection(source)
      .flatMap(
        _.find(query)
          .cursor[AnalyzedPost](ReadPreference.primaryPreferred)
          .collect[Seq](-1, Cursor.FailOnError[Seq[AnalyzedPost]]())
      )
  }
}
