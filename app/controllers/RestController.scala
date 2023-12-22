package controllers

import play.api.libs.json.Json
import play.api.mvc._
import service.AggregationService
import model.TrendRequest

import javax.inject._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future

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
      aggregationService.aggregateData(startDate, endDate).map { posts =>
        Ok(Json.toJson(posts))
      }
    }

  def getTrendstartDate(): Action[AnyContent] = Action.async {
    implicit request: Request[AnyContent] =>
      val trendRequest = TrendRequest(request)
      val result = aggregationService.aggregateTrend(trendRequest)
  }
}
