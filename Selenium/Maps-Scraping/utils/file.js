
const fs = require('node:fs');

async function writeFile(content, filename){
    try{
        fs.writeFileSync(__dirname + '/../output/'+ filename, content);
    }catch(e){
        console.log("Error on create file!\n", e);
    }
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

module.exports = { 
    writeFile,
    jsonToCsv  
};