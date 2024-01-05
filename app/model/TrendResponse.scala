package model

import play.api.libs.json.OFormat
import play.api.libs.json.Json

case class Datapoint(date: String, pos: Int, neg: Int, neut: Int)

object Datapoint {
  implicit val analyzedPostFormat: OFormat[Datapoint] =
    Json.format[Datapoint]
}

case class BarChartResponse(source: String, datapoints: Seq[Datapoint])

object BarChartResponse {
  implicit val analyzedPostFormat: OFormat[BarChartResponse] =
    Json.format[BarChartResponse]
}
