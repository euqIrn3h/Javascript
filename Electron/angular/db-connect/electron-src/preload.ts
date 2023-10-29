import * as path from "path";
import * as url from 'url';
import * as customBar from 'custom-electron-titlebar';
import { nativeImage } from "electron";


window.addEventListener('DOMContentLoaded', () => {
    new customBar.Titlebar({
        backgroundColor: customBar.TitlebarColor.fromHex('#2f3241'),
        icon: nativeImage.createFromPath(path.join(__dirname, '../src/favicon.ico'))
    });
});