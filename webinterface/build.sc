import mill._
import $ivy.`com.lihaoyi::mill-contrib-playlib:`, mill.playlib._

object webinterface extends PlayModule with SingleModule {

  def scalaVersion = "2.12.18"
  def playVersion = "2.8.1"

  object test extends PlayTests
}
