package controllers

import javax.inject._
import repository.TagesschauRepository
import play.api.mvc._
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json

@Singleton
class TagesschauController @Inject() (implicit
    ec: ExecutionContext,
    val cc: ControllerComponents,
    val repository: TagesschauRepository
) extends AbstractController(cc) {
  def random() = Action {
    Ok(math.random().toString())
  }

  def getAllPosts(): Action[AnyContent] = Action.async {
    implicit request: Request[AnyContent] =>
      repository.getAll().map { posts =>
        Ok(Json.toJson(posts))
      }
  }
}
