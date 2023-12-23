package model

import play.api.libs.json.OFormat
import play.api.libs.json.Json

case class Bar(date: String, pos: Int, neg: Int, neut: Int)

object Bar {
  implicit val analyzedPostFormat: OFormat[Bar] =
    Json.format[Bar]
}

case class BarChartResponse(source: String, bars: Seq[Bar])

object BarChartResponse {
  implicit val analyzedPostFormat: OFormat[BarChartResponse] =
    Json.format[BarChartResponse]
}
