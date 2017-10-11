const ru = require('cp-tools/libcptools/realm/realmUtil')

let dbPath = ru.dbPath
let dbSchema = ru.dbSchema
let registerPathAndSchema = ru.registerPathAndSchema
let testDB = ru.testDB
let allData = ru.allData
let subscribeChange = ru.subscribeChange
let unsubscribeChange = ru.unsubscribeChange

// your app specific methods are here...

module.exports = {
  dbPath,
  dbSchema,
  registerPathAndSchema,
  testDB,
  allData,
  subscribeChange,
  unsubscribeChange
}
