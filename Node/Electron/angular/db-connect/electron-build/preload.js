"use strict";
exports.__esModule = true;
var path = require("path");
var customBar = require("custom-electron-titlebar");
var electron_1 = require("electron");
window.addEventListener('DOMContentLoaded', function () {
    new customBar.Titlebar({
        backgroundColor: customBar.TitlebarColor.fromHex('#2f3241'),
        icon: electron_1.nativeImage.createFromPath(path.join(__dirname, '../src/favicon.ico'))
    });
});
