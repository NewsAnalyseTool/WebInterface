name := """WebInterface"""
organization := "de.htw-berlin"

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
// .settings(
//   javaOptions += "--add-opens=java.base/java.lang=ALL-UNNAMED"
// )

scalaVersion := "2.13.12"

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
  "org.reactivemongo" %% "play2-reactivemongo" % "1.1.0.play29-RC12"
)

import play.sbt.routes.RoutesKeys

RoutesKeys.routesImport += "play.modules.reactivemongo.PathBindables._"

routesGenerator := InjectedRoutesGenerator

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "de.htw-berlin.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "de.htw-berlin.binders._"
