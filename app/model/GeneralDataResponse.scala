package model

import play.api.libs.json.Json
import play.api.libs.json.OFormat

/** defines response object for the general data request of a single source
  *
  * @param name
  * @param articleCount
  * @param articlePerc
  * @param categoryCount
  * @param posArticles
  * @param posArticlesPerc
  * @param neuArticles
  * @param neuArticlesPerc
  * @param negArticles
  * @param negArticlesPerc
  * @param categories
  */
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

/** grouping of articles by category with additional data
  *
  * @param name
  * @param count
  * @param pos
  * @param posPerc
  * @param neg
  * @param negPerc
  */
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

/** response type for the general data request
  *
  * @param totalArticles
  * @param totalCategories
  * @param sources
  */
case class GeneralDataResponse(
    totalArticles: Int,
    totalCategories: Int,
    sources: Seq[SourceResponse]
)

object GeneralDataResponse {
  implicit val analyzedPostFormat: OFormat[GeneralDataResponse] =
    Json.format[GeneralDataResponse]
}
