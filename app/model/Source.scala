package model

/**
  * enum representation of the sources
  */
object Source extends Enumeration {
  type Source = Value
  val Tagesschau, Reddit, Bbc = Value
}
