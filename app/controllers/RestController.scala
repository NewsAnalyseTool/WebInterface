package controllers

import play.api.libs.json.Json
import play.api.mvc._
import service.AggregationService
import model.TrendRequest

import javax.inject._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import model.Source
import model.BarChartResponse
import model.Response
import play.api.libs.json.JsArray

@Singleton
class RestController @Inject() (implicit
    ec: ExecutionContext,
    val cc: ControllerComponents,
    val aggregationService: AggregationService
) extends AbstractController(cc) {

  def getData(
      startDate: String,
      endDate: String
  ): Action[AnyContent] =
    Action.async { implicit request: Request[AnyContent] =>
      aggregationService.aggregateData(startDate, endDate).map {
        posts: Response =>
          Ok(Json.toJson(posts))
      }
    }

  def getSentimentTrend(
      startDate: String,
      endDate: String
  ): Action[AnyContent] = Action.async {
    implicit request: Request[AnyContent] =>
      aggregationService
        .getTrendForEachSource(startDate, endDate)
        .map { responses: Seq[BarChartResponse] =>
          val jsonResponses: JsArray = Json.toJson(responses).as[JsArray]
          Ok(jsonResponses)
        }
  }
}
