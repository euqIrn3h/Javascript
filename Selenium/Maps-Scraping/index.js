const {By, Builder} = require("selenium-webdriver");
const fs = require('node:fs');
const X_PATH = require('./xpaths');
require("chromedriver");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

class Enterprise{
    name;
    address;
    phone;
    website;
}

getEnterprisesCsv();

async function getEnterprisesCsv(){
 
    var searchString = "Farmacia Juiz de fora";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    await driver.get("https://www.google.com.br/maps/@-21.741568,-43.3782784,13z?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D");
        
    //To send a search query by passing the value in searchString.
    await driver.findElement(By.id("searchboxinput")).sendKeys(searchString);

    await driver.findElement(By.id("searchbox-searchbutton")).click();
    await sleep(5000);

    let elements;
    let enterprises = [];
    let errs = [];
    let i=0;

    //Scrolar até encontrar a quantidade desejada de empresas
    do{ 
        elements = await driver.findElements(By.xpath(X_PATH.ENTERPRISE));
        console.log("Elementos encontrados: "+ elements.length);
        console.log("N scroll: " +i);

        //Div com empresas no maps para poder scrolar
        let feed = await driver.findElement(By.xpath(X_PATH.ENTERPRISES_FEED));
        await driver.actions().scroll(0, -50, 0, 1000, feed).perform();

        await sleep(1000);
        i++;
    }while(elements.length < 6 && i < 100);

    //Preencher array de enmpresas
    for(let element of elements){
        try{
            await element.click();
            let card = await driver.findElement(By.xpath(X_PATH.ENTERPRISE_CARD));
            await sleep(1000);
            let newEnterprise = new Enterprise();
            await card.findElement(By.xpath(X_PATH.ENTERPRISE_NAME)).getText().then( name => newEnterprise.name = name);
            await card.findElement(By.xpath(X_PATH.ENTERPRISE_ADDRESS)).getText().then( address => newEnterprise.address = address);
            await card.findElement(By.xpath(X_PATH.ENTERPRISE_PHONE)).getText().then( phone => newEnterprise.phone = phone);
            await card.findElement(By.xpath(X_PATH.ENTERPRISE_WEBSITE)).getAttribute('href').then( website => { website ? newEnterprise.website = website : "Sem website" });
            enterprises.push(newEnterprise);
        }catch(e){
            errs.push(e);
        }
    }

    console.log("Erros: "+ errs.length);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();

    let csv = await jsonToCsv(enterprises);
    writeFile(csv, 'outpu.csv');
}

async function jsonToCsv(jsonData) {
    let csv = '';
    // Cria o cabeçalho do CSV com as chaves do primeiro objeto do array JSON
    let header = Object.keys(jsonData[0]).join(',');
    csv += header + '\n';

    // Itera sobre cada objeto do array JSON
    jsonData.forEach(obj => {
        // Itera sobre cada chave do objeto
        Object.keys(obj).forEach(key => {
            // Adiciona o valor da chave ao CSV, com aspas duplas caso haja vírgulas ou aspas no valor
            let value = obj[key];
            if (typeof value === 'string') {
                value = value.replace(/"/g, '""'); // Duplica as aspas duplas para escapá-las
                if (value.indexOf(',') !== -1 || value.indexOf('"') !== -1) {
                    value = '"' + value + '"';
                }
            }
            csv += value + ',';
        });
        csv += '\n';
    });

    return csv;
}

async function writeFile(content, filename){
    try{
        fs.writeFileSync(__dirname + '/output/'+ filename, content);
    }catch(e){
        console.log("Error on create file!\n", e);
    }
}