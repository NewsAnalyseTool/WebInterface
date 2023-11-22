package repository

import model.AnalysisModel
import play.modules.reactivemongo._
import reactivemongo.api
import reactivemongo.api.ReadPreference
import reactivemongo.api.bson.BSONDocument
import reactivemongo.api.bson.collection.BSONCollection

import javax.inject.Inject
import javax.inject.Singleton
import scala.concurrent.ExecutionContext
import scala.concurrent.Future

@Singleton
class RedditRepository @Inject() (implicit
    val ec: ExecutionContext,
    val mongoApi: ReactiveMongoApi
) {
  def collection(): Future[BSONCollection] = {
    mongoApi.database.map(db => db.collection("redditTestAnalysis"))
  }

  def getAll(limit: Int = 100): Future[Seq[AnalysisModel]] = {
    collection.flatMap(
      _.find(BSONDocument())
        .cursor[AnalysisModel](ReadPreference.Primary)
        .collect[Seq](limit, api.Cursor.FailOnError[Seq[AnalysisModel]]())
    )
  }
}
