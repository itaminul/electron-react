const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: true
     // preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})