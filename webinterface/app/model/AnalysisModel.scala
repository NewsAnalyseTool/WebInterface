package model

import reactivemongo.api.bson.BSONDocumentHandler
import reactivemongo.api.bson.Macros
import play.api.libs.json.Format
import play.api.libs.json.Json

case class AnalysisModel(category: String, count: Int)

object AnalysisModel {
  implicit val modelFormat: BSONDocumentHandler[AnalysisModel] =
    Macros.handler[AnalysisModel]
  implicit val fmt: Format[AnalysisModel] = Json.format[AnalysisModel]
}
