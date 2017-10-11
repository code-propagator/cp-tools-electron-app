'use strict'
const electron = require('electron')
const ipcMain = electron.ipcMain

let installTasks = (syncTasks, asyncTasks) => {
  syncTasks.map((elem, index) => {
    let ename = elem.eventName
    let fn = elem.fn
    ipcMain.removeAllListeners(ename)
    ipcMain.on(ename, (event, arg) => {
      console.log('ipcMain SYNC RECEIVED', ename, arg)
      let reply = fn(arg)
      console.log('---> ipcMain SYNC REPLY')
      event.returnValue = reply
    })
  })

  asyncTasks.map((elem, index) => {
    let ename = elem.eventName
    let fn = elem.fn
    let rname = elem.replyEventName
    ipcMain.removeAllListeners(ename)
    ipcMain.on(ename, (event, arg) => {
      console.log('ipcMain ASYNC RECEIVED', ename, arg, fn)
      fn(arg, (reply) => {
        console.log('---> ipcMain ASYNC REPLY', rname)
        event.sender.send(rname, reply)
      })
    })
  })
}

let send = (eventName, arg) => {
  let mainWindowManager = require('./mainWindowManagerd')
  console.log('mainWindow.getMainWindow()', mainWindowManager.getMainWindow())
  let mainWindow = mainWindowManager.getMainWindow()
  console.log('mainWindow is', mainWindow)
  // Get the webContents of the window
  let webContents = mainWindow.webContents
  // console.log('webContents', webContents)
  console.log('try send')
  webContents.send(eventName, arg)
}

module.exports = {
  installTasks,
  send
}
