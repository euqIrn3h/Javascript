import * as path from "path";
import * as url from 'url';
import * as customBar from 'custom-electron-titlebar';


window.addEventListener('DOMContentLoaded', () => {
    new customBar.Titlebar({
        backgroundColor: customBar.TitlebarColor.fromHex('#2f3241'),
        icon: url.format(path.join(__dirname, '/assets/logo.ico'))
    });

    const replaceText = (selector: any, text: any) => {
        const element = document.getElementById(selector)
        if ( element ) element.innerText = text 
    }

});