package repository

import play.modules.reactivemongo._
import reactivemongo.api._
import reactivemongo.api.ReadPreference
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

@Singleton
class TagesschauRepository @Inject() (implicit
    ec: ExecutionContext,
    mongoApi: ReactiveMongoApi,
    config: Configuration
) {

  private def collection(): Future[BSONCollection] = {
    mongoApi.database.map(db =>
      db.collection(config.get[String]("source.tagesschau"))
    )
  }

  def getAll(limit: Int = 100): Future[Seq[AnalyzedPost]] = {
    collection().flatMap(
      _.find(BSONDocument())
        .cursor[AnalyzedPost](ReadPreference.Primary)
        .collect[Seq](limit, Cursor.FailOnError[Seq[AnalyzedPost]]())
    )
  }

  def getPostsDateConstriction(
      start: Date,
      end: Date
  ): Future[Seq[AnalyzedPost]] = {

    val query = BSONDocument(
      "date" -> BSONDocument(
        "$gte" -> BSONDateTime(start.getTime()),
        "$lte" -> BSONDateTime(end.getTime())
      )
    )

    collection()
      .flatMap(
        _.find(query)
          .cursor[AnalyzedPost](ReadPreference.Primary)
          .collect[Seq](-1, Cursor.FailOnError[Seq[AnalyzedPost]]())
      )
  }
}
