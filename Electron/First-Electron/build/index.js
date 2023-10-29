"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const main_1 = require("custom-electron-titlebar/main");
const path = __importStar(require("path"));
electron_1.app.on("ready", () => {
    (0, main_1.setupTitlebar)();
    const win = new electron_1.BrowserWindow({
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
    (0, main_1.attachTitlebarToWindow)(win);
});
