package controllers

import javax.inject._
import play.api.mvc._
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json
import java.util.Date
import java.text.SimpleDateFormat
import model.Source
import service.AggregationService

@Singleton
class RestController @Inject() (implicit
    ec: ExecutionContext,
    val cc: ControllerComponents,
    val aggregationService: AggregationService
) extends AbstractController(cc) {

  // def getAllPosts(): Action[AnyContent] = Action.async {
  //   implicit request: Request[AnyContent] =>
  //     tagesschau.getAllPosts().map { posts =>
  //       Ok(Json.toJson(posts))
  //     }
  // }

  def getData(
      startDate: Option[String],
      endDate: Option[String]
  ): Action[AnyContent] =
    Action.async { implicit request: Request[AnyContent] =>
      aggregationService.aggregateData(startDate, endDate).map { posts =>
        Ok(Json.toJson(posts))
      }
    }
}
