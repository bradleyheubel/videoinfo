const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({webPreferences:{nodeIntegration: true}})
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('video:submit', (event, videoPath) => {
    ffmpeg.setFfprobePath("G:\\ffmpeg\\bin\\ffprobe.exe")
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
        mainWindow.webContents.send('video:metadata', metadata.format.duration)
    })
})