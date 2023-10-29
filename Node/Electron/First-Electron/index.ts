import { app, BrowserWindow, Tray, Menu, BrowserView } from "electron";
import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar/main";
import * as path from "path";

app.on("ready", () => {
  setupTitlebar();

  const win = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const indexHTML = path.join(__dirname + "/index.html");
  win
    .loadFile(indexHTML)
    .then(() => {
      // IMPLEMENT FANCY STUFF HERE
    })
    .catch((e) => console.error(e));
    attachTitlebarToWindow(win);
});