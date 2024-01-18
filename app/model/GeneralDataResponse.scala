package model

import play.api.libs.json.Json
import play.api.libs.json.OFormat

case class SourceResponse(
    name: String,
    articleCount: Int,
    articlePerc: Double,
    categoryCount: Int,
    posArticles: Int,
    posArticlesPerc: Double,
    neuArticles: Int,
    neuArticlesPerc: Double,
    negArticles: Int,
    negArticlesPerc: Double,
    categories: Seq[Category]
)

object SourceResponse {
  implicit val analyzedPostFormat: OFormat[SourceResponse] =
    Json.format[SourceResponse]
}

case class Category(
    name: String,
    count: Int,
    pos: Int,
    posPerc: Double,
    neg: Int,
    negPerc: Double
)

object Category {
  implicit val analyzedPostFormat: OFormat[Category] =
    Json.format[Category]
}

case class GeneralDataResponse(
    totalArticles: Int,
    totalCategories: Int,
    sources: Seq[SourceResponse]
)

object GeneralDataResponse {
  implicit val analyzedPostFormat: OFormat[GeneralDataResponse] =
    Json.format[GeneralDataResponse]
}
