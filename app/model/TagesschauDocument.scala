package model

import play.api.libs.json.Format
import play.api.libs.json.Json
import play.api.libs.json.OFormat
import reactivemongo.api.bson.BSONReader
import reactivemongo.api.bson.BSONDocument
import scala.util.Try
import reactivemongo.api.bson.BSONDocumentReader
import reactivemongo.api.bson.BSONString

case class AnalyzedPost(
    source: String,
    title: String,
    text: String,
    category: String,
    date: String,
    url: String,
    result: String,
    positive: Double,
    negative: Double,
    neutral: Double
)

// defining custom reader because mongodb saves the sentiment fields as String
// but we need it as a Double
object AnalyzedPost {
  implicit object AnalyzedPostReader extends BSONDocumentReader[AnalyzedPost] {

    override def readDocument(doc: BSONDocument): Try[AnalyzedPost] = {
      val source = doc.getAsTry[String]("source").get
      val title = doc.getAsTry[String]("title").get
      val text = doc.getAsTry[String]("text").get
      val category = doc.getAsTry[String]("category").get
      val date = doc.getAsTry[String]("date").get
      val url = doc.getAsTry[String]("url").get
      val result = doc.getAsTry[String]("result").get
      val positive = doc.getAsOpt[BSONString]("positive").map(_.value.toDouble).getOrElse(-2.0)
      val negative = doc.getAsOpt[BSONString]("negative").map(_.value.toDouble).getOrElse(-2.0)
      val neutral = doc.getAsOpt[BSONString]("neutral").map(_.value.toDouble).getOrElse(-2.0)
      Try(
        AnalyzedPost(
          source = source,
          title = title,
          text = text,
          category = category,
          date = date,
          url = url,
          result = result,
          positive = positive,
          negative = negative,
          neutral = neutral
        )
      )
    }
  }

  implicit val analyzedPostFormat: OFormat[AnalyzedPost] =
    Json.format[AnalyzedPost]
}
