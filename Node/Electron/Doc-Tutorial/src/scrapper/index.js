const {By, Builder} = require("selenium-webdriver");
const X_PATH = require('./xpaths');
const file_utils = require('./utils/file');
require("chromedriver");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

class Enterprise{
    name;
    address;
    phone;
    website;
}

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

    return await file_utils.jsonToCsv(enterprises);
}

module.exports = { getEnterprisesCsv };
