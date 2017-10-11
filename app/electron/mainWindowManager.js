const electron = require('electron')
const app = electron.app
console.log('starting electron app')

// ---------------------------------------------------------------
const win = require('cp-tools/libcptools/electron/createWindow')
const path = require('path')

const WINDOW_WIDTH = 1800
const WINDOW_HEIGHT = 900

let createMainWindow = () => {
  let indexhtml = path.join(__dirname, '..', 'win', 'index.electron.html')
  console.log('index.electron.html', indexhtml)
  return win.createWindow(WINDOW_WIDTH, WINDOW_HEIGHT, indexhtml)
}

let mainWindow

let setup = () => {
  app.on('ready', () => {
    mainWindow = createMainWindow()
    console.log('app ready having mainWindow', mainWindow)
    // Note that at this moment, there is no confidence react components are ready.
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    console.log('activate')
    if (mainWindow === null) {
      mainWindow = createMainWindow()
    }
  })
}

let getMainWindow = () => {
  return mainWindow
}

module.exports = {
  setup,
  getMainWindow
}
