package controllers

import play.api.libs.json.Json
import play.api.mvc._
import service.AggregationService

import javax.inject._
import scala.concurrent.ExecutionContext

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
      startDate: String,
      endDate: String
  ): Action[AnyContent] =
    Action.async { implicit request: Request[AnyContent] =>
      aggregationService.aggregateData(startDate, endDate).map { posts =>
        Ok(Json.toJson(posts))
      }
    }
}
