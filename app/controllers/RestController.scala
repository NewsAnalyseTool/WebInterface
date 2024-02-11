package controllers

import play.api.libs.json.Json
import play.api.mvc._
import service.AggregationService

import javax.inject._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import model.Source
import model.DatapointChartResponse
import model.GeneralDataResponse
import play.api.libs.json.JsArray

/** Main controller handling requests from the frontend
  */
@Singleton
class RestController @Inject() (implicit
    ec: ExecutionContext,
    val cc: ControllerComponents,
    val aggregationService: AggregationService
) extends AbstractController(cc) {

  /**
    * retrieves general data in the provided span of time
    *
    * @param startDate starting date
    * @param endDate ending date
    * @return GeneralDataResponse from startDate to endDate
    */
  def getData(
      startDate: String,
      endDate: String
  ): Action[AnyContent] =
    Action.async { implicit request: Request[AnyContent] =>
      aggregationService.aggregateGeneralStats(startDate, endDate).map {
        posts: GeneralDataResponse =>
          Ok(Json.toJson(posts))
      }
    }

    /**
      * retrieves data for the sentiment trend in the provided range
      *
      * @param startDate staring Date
      * @param endDate ending Date
      * @return sequnce of DatapointChartResponse for each source
      */
  def getSentimentTrend(
      startDate: String,
      endDate: String
  ): Action[AnyContent] = Action.async {
    implicit request: Request[AnyContent] =>
      aggregationService
        .getTrendForEachSource(startDate, endDate)
        .map { responses: Seq[DatapointChartResponse] =>
          val jsonResponses: JsArray = Json.toJson(responses).as[JsArray]
          Ok(jsonResponses)
        }
  }
}
