"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var main_1 = require("custom-electron-titlebar/main");
var path = require("path");
electron_1.app.on("ready", function () {
    (0, main_1.setupTitlebar)();
    var win = new electron_1.BrowserWindow({
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
        .then(function () {
        // IMPLEMENT FANCY STUFF HERE
    })["catch"](function (e) { return console.error(e); });
    (0, main_1.attachTitlebarToWindow)(win);
});
