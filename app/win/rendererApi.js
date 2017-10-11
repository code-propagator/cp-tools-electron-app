// Sync and Async functions
var __callSync = (eventName, arg) => {
  console.log('#### __callSync', eventName, arg)
  // get current config on the fly
  const AppConfig = require('../AppConfig')
  console.log('CHECK', AppConfig.isElectron)
  if (AppConfig.isElectron === true) {
    const { ipcRenderer } = window.require('electron')
    console.log('#### __SyncElectron', eventName, arg)
    let result = ipcRenderer.sendSync(eventName, arg)
    console.log('#### __SyncElectron result')
    // ===> event.returnValue in the main is obtained.
    // After SYNC request, the event has some immediate result from main.
    return result
    // return ipcRenderer.sendSync(eventname, arg)
  } else {
    const tasks = require('../task/tasks')
    // ### To avoid regenerate error,
    // ### npm install babel-plugin-transform-runtime --save-dev
    // ===> .bashrc
    //{
    //  "presets": ["es2015", "stage-0", "react"],
    //  "plugins": ["transform-runtime"]
    //}

    // For web browser, we can directly call predefined task in tasks.js.
    let syncTasks = tasks.syncTasks
    console.log('syncTasks', syncTasks)
    // find task function
    let fn = null
    syncTasks.map((task, index) => {
      if (task.eventName === eventName) {
        fn = task.fn
      }
    })
    // execute task function
    let result = null
    if (fn !== null) {
      console.log('#### __SyncWeb', eventName, arg);
      result = fn(arg)
      console.log('#### __SyncWeb result')
    }
    return result
  }
}

var __call = (eventName, arg, replyEventName, replyHandler) => {
  console.log('#### __call', eventName, arg)
  // get current config on the fly
  const AppConfig = require('../AppConfig')
  console.log('CHECK', AppConfig.isElectron)
  if (AppConfig.isElectron === true) {
    const { ipcRenderer } = window.require('electron')
    console.log('#### __Electron', eventName, arg)
    // set reply handler
    // ### AVOID MULTIPLE LISTENERS FOR THE SAME REPLYNAME
    ipcRenderer.removeAllListeners(replyEventName)
    ipcRenderer.on(replyEventName, replyHandler)
    // call async
    ipcRenderer.send(eventName, arg)
  } else {
    const tasks = require('../task/tasks')
    // ### To avoid regenerate error,
    // ### npm install babel-plugin-transform-runtime --save-dev
    // ===> .bashrc
    //{
    //  "presets": ["es2015", "stage-0", "react"],
    //  "plugins": ["transform-runtime"]
    //}

    // For web browser, we can directly call predefined task in tasks.js.
    let asyncTasks = tasks.asyncTasks
    console.log('asyncTasks', asyncTasks)
    // find task function
    let fn = null
    asyncTasks.map((task, index) => {
      if (task.eventName === eventName) {
        fn = task.fn
      }
    })
    // execute task function
    if (fn !== null) {
      console.log('#### __AsyncWeb', eventName, arg);
      fn(arg, (result) => {
        console.log('#### __AsyncWeb result')
        replyHandler(replyEventName, result)
      })
    } else {
      replyHandler(replyEventName, null)
    }
  }
}

let callMainSync = (request) => {
  let msg = typeof request !== 'undefined' ? request : 'rendererApi SYNC ping'
  console.log('rendererApi.callMainSync:', msg)
  return __callSync('synchronous-message', msg)
}

let callMainGetSync = (request) => {
  return __callSync('synchronous-get', request)
}

let uuidv4 = require('uuid/v4')

let asynchronousMainCallbacks = {}

let callMain = (request, callback) => {
  let requestId = uuidv4()
  asynchronousMainCallbacks[requestId] = callback

  let msg = typeof request !== 'undefined' ? request : 'rendererApi ASYNC ping'
  console.log('rendererAPi.callMain asynchronous-message', msg)
  // ipcRenderer.send('asynchronous-message', msg)
  __call(
    'asynchronous-message', {requestId: requestId, request: msg},
    'asynchronous-message-reply', (event, arg) => {
      console.log('---> rendererApi asynchronous-message-reply:', event, arg)

      // let msg = '[[[inside asynchronous-reply rendererApi SYNC ping]]]'
      // let result = callMainSync(msg)
      // console.log('callMainSync result', result)
      let requestId = arg.requestId
      // let type = arg.type
      let result = arg.result
      let callback = asynchronousMainCallbacks[requestId]
      callback(result)

      delete asynchronousMainCallbacks[requestId]
    }
  )
}

let asynchronousGetCallbacks = {}

let callMainGet = (request, callback) => {
  let requestId = uuidv4()
  asynchronousGetCallbacks[requestId] = callback

  // ipcRenderer.send('asynchronous-get', {
  //  requestId: requestId,
  //  request: request
  // })

  __call(
    'asynchronous-get', {requestId: requestId, request: request},
    'asynchronous-get-reply', (event, arg) => {
      console.log('---> rendererApi asynchronous-get-reply:', event, arg)

      let requestId = arg.requestId
      // let type = arg.type
      let result = arg.result
      let callback = asynchronousGetCallbacks[requestId]
      callback(result)

      delete asynchronousGetCallbacks[requestId]
    }
  )
}

const emitter = require('cp-tools/libcptools/node/emitter')

const AppConfig = require('../AppConfig')
console.log('CHECK', AppConfig.isElectron)
if (AppConfig.isElectron === true) {
  const { ipcRenderer } = window.require('electron')
  let eventName = 'force-update'
  ipcRenderer.removeAllListeners(eventName)
  ipcRenderer.on(eventName, (event, arg) => {
    console.log('rendererApi', eventName, 'RECEIVED')
    // console.log('received arg', arg)
    // ### forward event as a JavaScript custom event,
    // ### rather than electron's one.
    emitter.updateEmitter.emit(eventName, arg)
  })
} else {
  // Web browser
  // directly emit event with arg from caller
}

module.exports = {
  callMainSync,
  callMain,
  callMainGetSync,
  callMainGet
}
