const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

class Enterprise{
    name;
    address;
    phone;
    website;
}

async function example(){
 
    var searchString = "Empresa Teste";

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

    elements = await driver.findElements(By.xpath("//a[contains(@class, 'hfpxzc')]"));
    for(let element of elements){
        await element.click();
        let card = await driver.findElement(By.xpath("//div[contains(@class, 'm6QErb DxyBCb kA9KIf dS8AEf XiKgde')]"));
        await sleep(1000);
        try{
            let newEnterprise = new Enterprise();
            await card.findElement(By.xpath("//h1[contains(@class, 'DUwDvf lfPIob')]")).getText().then( name => newEnterprise.name = name);
            await card.findElement(By.xpath("//h1[contains(@class, 'DUwDvf lfPIob')]")).getText().then( name => newEnterprise.name = name);
            console.log(newEnterprise);
        }catch(e){
            console.log(card);
        }
    }

    enterprises.forEach(enterprise => console.log(enterprise));


    
    //It is always a safe practice to quit the browser after execution
    await driver.quit();

}

example()