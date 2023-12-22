package model

import play.api.mvc.Request
import play.api.libs.json.OFormat
import play.api.libs.json.Json

sealed trait TrendRequest

case class GlobalTrendRequest(
    startDate: String,
    endDate: String,
    dataType: String,
    dataValue: String,
    scope: String
) extends TrendRequest

case class SourceTrendRequest(
    startDate: String,
    endDate: String,
    source: String,
    dataType: String,
    dataValue: String,
    scope: String
) extends TrendRequest

object TrendRequest {
  def apply(request: Request[_]): TrendRequest = {
    val startDate = request.getQueryString("startDate").getOrElse("")
    val endDate = request.getQueryString("endDate").getOrElse("")
    val dataType = request.getQueryString("dataType").getOrElse("")
    val dataValue = request.getQueryString("dataValue").getOrElse("")
    val scope = request.getQueryString("scope").getOrElse("")

    request.getQueryString("source") match {
      case Some(source) =>
        SourceTrendRequest(
          startDate,
          endDate,
          source,
          dataType,
          dataValue,
          scope
        )
      case None =>
        GlobalTrendRequest(startDate, endDate, dataType, dataValue, scope)
    }
  }
}

case class DatapointValue(name: String, value: Double)

object DatapointValue {
  implicit val analyzedPostFormat: OFormat[DatapointValue] =
    Json.format[DatapointValue]
}

case class Datapoint(date: String, values: Seq[DatapointValue])

object Datapoint {
  implicit val analyzedPostFormat: OFormat[Datapoint] =
    Json.format[Datapoint]
}

case class TrendResponse(datapoints: Seq[Datapoint])

object TrendResponse {
  implicit val analyzedPostFormat: OFormat[TrendResponse] =
    Json.format[TrendResponse]
}
