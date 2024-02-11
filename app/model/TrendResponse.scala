package model

import play.api.libs.json.OFormat
import play.api.libs.json.Json

/**
  * data for a single datapoint 
  *
  * @param date
  * @param pos
  * @param neg
  * @param neut
  * @param timeInMs
  */
case class Datapoint(
    date: String,
    pos: Int,
    neg: Int,
    neut: Int,
    timeInMs: Long
)

object Datapoint {
  implicit val analyzedPostFormat: OFormat[Datapoint] =
    Json.format[Datapoint]
}

case class DatapointChartResponse(source: String, datapoints: Seq[Datapoint])

object DatapointChartResponse {
  implicit val analyzedPostFormat: OFormat[DatapointChartResponse] =
    Json.format[DatapointChartResponse]
}
