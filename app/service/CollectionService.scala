package service

import model.Source._
import scala.concurrent.Future
import reactivemongo.api.bson.BSONDocument
import repository.MongoDb
import com.google.inject.Inject
import scala.concurrent.ExecutionContext
import javax.inject.Singleton
import model.AnalyzedPost
import java.text.SimpleDateFormat
import java.util.Date

class CollectionService @Inject() (implicit
    ec: ExecutionContext,
    val repo: MongoDb
) {

  private var source: Source = _

  def this(
      collectionSource: Source
  )(implicit ec: ExecutionContext, repo: MongoDb) = {
    this()(ec, repo)
    source = collectionSource
  }

  def getPostsByDateRange(
      startDate: Option[String],
      endDate: Option[String]
  ): Future[Seq[AnalyzedPost]] = {
    (startDate, endDate) match {
      case (Some(startDate: String), Some(endDate: String)) => {
        val dateFormat = new SimpleDateFormat("yyyy-MM-dd")
        val start = dateFormat.parse(startDate)
        val end = dateFormat.parse(endDate)
        repo.getByDateRange(start, end, source)
      }
      case (None, None) => repo.getAll(source)
      case _            => Future.successful(Seq.empty[AnalyzedPost])
    }
  }
}
