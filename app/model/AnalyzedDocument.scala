package model

import play.api.libs.json.Format
import play.api.libs.json.Json
import play.api.libs.json.OFormat
import reactivemongo.api.bson.BSONReader
import reactivemongo.api.bson.BSONDocument
import scala.util.Try
import reactivemongo.api.bson.BSONDocumentReader
import reactivemongo.api.bson.BSONString
import java.text.SimpleDateFormat
import reactivemongo.api.bson.BSONDateTime
import java.util.Date

case class AnalyzedPost(
    source: String,
    title: String,
    text: String,
    category: String,
    date: Date,
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

      val source: String = doc.getAsTry[String]("source").getOrElse("")
      val title: String = doc.getAsTry[String]("title").getOrElse("")
      val text: String = doc.getAsTry[String]("text").getOrElse("")
      val category: String = doc.getAsTry[String]("category").getOrElse("")
      val date: Date =
        new Date(
          doc.get("date").get.asInstanceOf[BSONDateTime].value
        )
      val url: String = doc.getAsTry[String]("url").getOrElse("")
      val result: String =
        doc.getAsTry[String]("result").getOrElse("").toLowerCase
      val positive: Double = doc
        .getAsOpt[BSONString]("positive")
        .map(_.value.toDouble)
        .getOrElse(-2.0)
      val negative: Double = doc
        .getAsOpt[BSONString]("negative")
        .map(_.value.toDouble)
        .getOrElse(-2.0)
      val neutral: Double = doc
        .getAsOpt[BSONString]("neutral")
        .map(_.value.toDouble)
        .getOrElse(-2.0)
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
