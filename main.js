// To check license for each modules:
// https://stackoverflow.com/questions/16274841/output-all-licenses-of-installed-node-js-libraries
// find * -name package.json | xargs grep '"license[s]*"' -A 3

// Excetute the command only once to start development.
// npm run setup-once
// https://github.com/realm/realm-js/issues/765
const electron = require('electron')
const app = electron.app

// ---------------------------------------------------------------
// let {BinaryUtil} = require('./cptools/node/BinaryUtil')
let BinaryUtil = require('cp-tools/libcptools/node/BinaryUtil')
console.log('BinaryUtil TEST', BinaryUtil)
BinaryUtil.testLong(12345678)

let timeUtil = require('cp-tools/libcptools/node/timeUtil')
console.log(timeUtil)
console.log(timeUtil.currentTimestamp())
console.log(timeUtil.currentTimestampUTC())

// ---------------------------------------------------------------
let userDataDir = app.getPath('userData')

// #############################################
// Change directrory for Realm
// https://github.com/realm/realm-js/issues/818
process.chdir(userDataDir)
// #############################################

const path = require('path')
let dbPath = path.join(userDataDir, 'database.realm')
console.log('dbPath', dbPath)
// /Users/codepropagator/Library/Application Support/electronquickstart/database.realm

let db = require('./app/db/database')
let schema = require('./app/db/schema').schema
db.registerPathAndSchema(dbPath, schema)
db.testDB()

// ---------------------------------------------------------------
// ### Open Main Window
// ### only single mainWindow is needed for SPA-like app.
let mainWindowManager = require('./app/electron/mainWindowManager')
mainWindowManager.setup()

// ---------------------------------------------------------------
let ipcMainTask = require('./app/electron/ipcMainTask')
let tasks = require('./app/task/tasks')

// ---------------------------------------------------------------
// Start listening any change in Realm database
let realmChangeMonitor = () => {
  console.log('realmChangeMonitor called')
  ipcMainTask.send('force-update', 'Anyway' + Math.random())
}
db.subscribeChange(realmChangeMonitor)
tasks.setDB(db)
ipcMainTask.installTasks(tasks.syncTasks, tasks.asyncTasks)

// ---------------------------------------------------------------
// ### Application Updater
const updater = require('cp-tools/libcptools/electron/autoUpdater')

const os = require('os').platform()
console.log('os', os)

var updateFeed

if (process.env.NODE_ENV === 'development') {
  if (os === 'darwin') {
    updateFeed = 'http://localhost:3000/updates/latest'
  }
}

const appVersion = require('./package.json').version
console.log('app version', appVersion)

updater.updateAppIfNeeded(updateFeed, appVersion)
