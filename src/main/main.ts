import {app, BrowserWindow} from 'electron'

async function init() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
        darkTheme: false,
        show: false,
    })
    win.webContents.on('new-window', e => e.preventDefault())
    win.removeMenu()
    if (!app.isPackaged)
        win.webContents.openDevTools({mode: 'detach'})

    if (app.isPackaged)
        await win.loadFile('./index.html')
    else
        // @ts-ignore
        await win.loadURL(`http://localhost:${WDS_PORT}`)
    win.show()
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on("ready", init)