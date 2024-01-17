package repository

import play.modules.reactivemongo._
import reactivemongo.api._
import reactivemongo.api.bson.BSONDocument
import reactivemongo.api.bson.collection.BSONCollection

import javax.inject.Inject
import javax.inject.Singleton
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import play.api.Configuration
import reactivemongo.play.json.compat._
import model.AnalyzedPost
import reactivemongo.api.bson.BSONString
import reactivemongo.api.bson.BSONDateTime
import java.util.Date
import model.Source._
import reactivemongo.api.bson.BSONArray

@Singleton
class MongoDb @Inject() (implicit
    ec: ExecutionContext,
    @NamedDatabase("tagesschau") val tagesschauApi: ReactiveMongoApi,
    @NamedDatabase("reddit") val redditApi: ReactiveMongoApi,
    @NamedDatabase("bbc") val bbcApi: ReactiveMongoApi,
    val config: Configuration
) {

  private def getCollection(source: Source): Future[BSONCollection] = {
    // source match {
    //   case Reddit =>
    //     mongoApi.connection
    //       .database("Reddit")
    //       .map(_.collection(config.get[String]("source.reddit")))
    //
    //   case Tagesschau =>
    //     mongoApi.connection
    //       .database("Tagesschau")
    //       .map(_.collection(config.get[String]("source.tagesschau")))
    //
    //   case Bbc =>
    //     mongoApi.connection
    //       .database("BBC")
    //       .map(_.collection(config.get[String]("source.bbc")))
    // }

    // mongoApi.database.map { db =>
    //   val dbName = source match {
    //     case Reddit     => config.get[String]("source.reddit")
    //     case Tagesschau => config.get[String]("source.tagesschau")
    //     case Bbc        => config.get[String]("source.bbc")
    //   }
    //   db.collection(collectionName)
    // }

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

  def getAll(source: Source): Future[Seq[AnalyzedPost]] = {
    getCollection(source)
      .flatMap(
        _.find(BSONDocument())
          .cursor[AnalyzedPost](ReadPreference.primaryPreferred)
          .collect[Seq](-1, Cursor.FailOnError[Seq[AnalyzedPost]]())
      )
  }

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
