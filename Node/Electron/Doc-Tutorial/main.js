const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const { getEnterprisesCsv } = require('./src/scrapper/index.js');
const file_utils = require('./src/scrapper/utils/file.js');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // Desativado por segurança
            contextIsolation: true, // Recomendado
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('./src/index.html');
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong');
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        // Abrir as ferramentas de desenvolvedor
        mainWindow.webContents.openDevTools();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Manipulador para receber o pedido de abrir o seletor de diretórios
ipcMain.handle('chooseDirectory', async () => {
    const resultado = await dialog.showOpenDialog(win, {
        properties: ['openDirectory'] // Apenas selecionar diretórios
    });
    return resultado.filePaths[0]; 
});

ipcMain.handle('getEnterprisesCsv', async (event, args) => {
    return getEnterprisesCsv(args.city, args.business, args.maxRecords, args.maxIterations); 
});

ipcMain.handle('fileUtils', async (event, args) => {
    file_utils.writeFile(args.csv, args.path); 
});