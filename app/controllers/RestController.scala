package controllers

import javax.inject._
import play.api.mvc._
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json
import java.util.Date
import java.text.SimpleDateFormat
import model.Source
import service.TagesschauService

@Singleton
class RestController @Inject() (implicit
    ec: ExecutionContext,
    val cc: ControllerComponents,
    val tagesschau: TagesschauService
) extends AbstractController(cc) {

  // def getAllPosts(): Action[AnyContent] = Action.async {
  //   implicit request: Request[AnyContent] =>
  //     tagesschau.getAllPosts().map { posts =>
  //       Ok(Json.toJson(posts))
  //     }
  // }

  def getPosts(
      startDate: Option[String],
      endDate: Option[String]
  ): Action[AnyContent] =
    Action.async { implicit request: Request[AnyContent] =>
      tagesschau.getPostsByDateRange(startDate, endDate).map { posts =>
        Ok(Json.toJson(posts))
      }
    }
}
