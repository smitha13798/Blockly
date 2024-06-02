const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    ipcMain.handle('save-code-to-file', async (event, code) => {
        const { filePath } = await dialog.showSaveDialog({
            buttonLabel: 'Save Python code',
            filters: [{ name: 'Python Files', extensions: ['py'] }]
        });

        if (filePath) {
            fs.appendFileSync(filePath, `${code}\n`);
            return filePath;
        }
        return '';
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
