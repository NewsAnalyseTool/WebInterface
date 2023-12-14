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

@Singleton
class TagesschauService @Inject() (implicit
    ec: ExecutionContext,
    val repo: MongoDb
) {

  private val source = Tagesschau

  def getAllPosts(): Future[Seq[AnalyzedPost]] = {
    repo.getAll(source)
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
        repo.getPostsByDateRange(start, end, source)
      }
      case (None, None) => repo.getAll(source)
      case _            => Future.successful(Seq.empty[AnalyzedPost])
    }
  }
}
