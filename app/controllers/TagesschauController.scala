package controllers

import javax.inject._
import repository.TagesschauRepository
import play.api.mvc._
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json
import java.util.Date
import java.text.SimpleDateFormat

@Singleton
class TagesschauController @Inject() (implicit
    ec: ExecutionContext,
    val cc: ControllerComponents,
    val repository: TagesschauRepository
) extends AbstractController(cc) {
  def random() = Action {
    Ok(math.random().toString())
  }

  def getAllPosts(): Action[AnyContent] = Action.async {
    implicit request: Request[AnyContent] =>
      repository.getAll().map { posts =>
        Ok(Json.toJson(posts))
      }
  }

  def getPostsDate(startDate: String, endDate: String): Action[AnyContent] =
    Action.async { implicit request: Request[AnyContent] =>
      val dateFormat = new SimpleDateFormat("yyyy-MM-dd")
      val start = dateFormat.parse(startDate)
      val end = dateFormat.parse(endDate)

      repository
        .getPostsDateConstriction(start, end)
        .map(posts => Ok(Json.toJson(posts)))
    }
}
