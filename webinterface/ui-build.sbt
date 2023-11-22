import scala.sys.process.Process

val Success = 0
val Error = 1

PlayKeys.playRunHooks += baseDirectory.map(FrontendRunHook.apply).value

val isWindows = System.getProperty("os.name").toLowerCase().contains("win")

def runOnCommandline(script: String)(implicit dir: File): Int = {
  if (isWindows) { Process("cmd /c set CI=true&&" + script, dir) }
  else { Process("env CI=true " + script, dir) }
} !

// Check of node_modules directory exist in given directory.
def isNodeModulesInstalled(implicit dir: File): Boolean =
  (dir / "node_modules").exists()

// Execute `npm install` command to install all node module dependencies. Return Success if already installed.
def runNpmInstall(implicit dir: File): Int =
  if (isNodeModulesInstalled) Success
  else runOnCommandline(FrontendCommands.dependencyInstall)

// Execute task if node modules are installed, else return Error status.
def ifNodeModulesInstalled(task: => Int)(implicit dir: File): Int =
  if (runNpmInstall == Success) task
  else Error

// Execute frontend test task. Update to change the frontend test task.
def executeUiTests(implicit dir: File): Int = ifNodeModulesInstalled(
  runOnCommandline(FrontendCommands.test)
)

// Execute frontend prod build task. Update to change the frontend prod build task.
def executeProdBuild(implicit dir: File): Int = ifNodeModulesInstalled(
  runOnCommandline(FrontendCommands.build)
)

// Create frontend build tasks for prod, dev and test execution.

lazy val `ui-test` = TaskKey[Unit]("run UI tests when testing application.")

`ui-test` := {
  implicit val userInterfaceRoot = baseDirectory.value / "ui"
  if (executeUiTests != Success) throw new Exception("UI tests failed!")
}

lazy val `ui-prod-build` =
  TaskKey[Unit]("run UI build when packaging the application.")

`ui-prod-build` := {
  implicit val userInterfaceRoot = baseDirectory.value / "ui"
  if (executeProdBuild != Success)
    throw new Exception("oops! UI Build crashed.")
}

// Execute frontend prod build task prior to play dist execution.
dist := (dist dependsOn `ui-prod-build`).value

// Execute frontend prod build task prior to play stage execution.
stage := (stage dependsOn `ui-prod-build`).value

// Execute frontend test task prior to play test execution.
test := (Test / test dependsOn `ui-test`).value
