"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
electron_1.app.on("ready", function () {
    var win = new electron_1.BrowserWindow({
        width: 600,
        height: 400
    });
    var indexHTML = path.join(__dirname + "/index.html");
    win
        .loadFile(indexHTML)
        .then(function () {
        // IMPLEMENT FANCY STUFF HERE
    })["catch"](function (e) { return console.error(e); });
});
