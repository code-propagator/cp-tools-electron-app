
let db

let setDB = (d) => {
  db = d
}

let syncTasks = [
  {
    eventName: 'synchronous-message',
    fn: (arg) => {
      return 'SYNC pong pong' + Math.random()
    }
  },
  {
    eventName: 'synchronous-get',
    fn: (arg) => {
      // echo
      return arg + Math.random()
    }
  }
]

let handle = require('./handleTasks')

let asyncTasks = [
  {
    eventName: 'asynchronous-message',
    fn: (arg, callback) => {
      let requestId = arg.requestId
      let reply = {
        requestId: requestId,
        result: 'ASYNC pong pong' + requestId
      }
      setTimeout(() => {
        callback(reply)
      }, 3000)
    },
    replyEventName: 'asynchronous-message-reply'
  },
  {
    eventName: 'asynchronous-get',
    fn: (arg, callback) => {
      let requestId = arg.requestId
      handle.handleTasks(db, arg, (result) => {
        // result or error comes here
        let reply = {
          requestId: requestId,
          // type: request.type,
          result: result
        }
        callback(reply)
      })
    },
    replyEventName: 'asynchronous-get-reply'
  }
]

module.exports = {
  db,
  setDB,
  syncTasks,
  asyncTasks
}
