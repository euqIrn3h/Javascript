import { app, BrowserWindow } from "electron";
import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar/main";
import * as path from "path";
import { AppDataSource } from './database/data-source';

app.on("ready", () => {
  setupTitlebar();

  const win = new BrowserWindow({
    minWidth: 420,
    height: 400,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win
    .loadURL("http://localhost:4200")
    .then(() => {
      AppDataSource.initialize()
          .then(() => console.log("DB Inicializado!"))
          .catch(() => console.log("DB não inicializado!"));
    })
    .catch((e) => console.error(e));
    attachTitlebarToWindow(win);
});