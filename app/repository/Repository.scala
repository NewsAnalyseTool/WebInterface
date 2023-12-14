package repository

import play.modules.reactivemongo._
import reactivemongo.api
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

@Singleton
class TagesschauRepository @Inject() (implicit
    ec: ExecutionContext,
    mongoApi: ReactiveMongoApi,
    config: Configuration
) {

  def collection(): Future[BSONCollection] = {
    mongoApi.database.map(db =>
      db.collection(config.get[String]("source.tagesschau"))
    )
  }

  def getAll(limit: Int = 100): Future[Seq[AnalyzedPost]] = {
    collection().flatMap(
      _.find(BSONDocument())
        .cursor[AnalyzedPost](ReadPreference.Primary)
        .collect[Seq](limit, api.Cursor.FailOnError[Seq[AnalyzedPost]]())
    )
  }
}
