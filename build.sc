import mill._
import $ivy.`com.lihaoyi::mill-contrib-playlib:`, mill.playlib._

object webinterface extends PlayModule with SingleModule {

  def scalaVersion = "2.13.12"
  def playVersion = "2.9.0"

  object test extends PlayTests
}
