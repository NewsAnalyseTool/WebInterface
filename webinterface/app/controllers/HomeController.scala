package controllers

import javax.inject._

import play.api.mvc._

@Singleton
class HomeController @Inject() (
    cc: ControllerComponents
) extends AbstractController(cc) {
  def random() = Action {
    Ok(math.random().toString())
  }
}
