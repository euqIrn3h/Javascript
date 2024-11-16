const fs = require('node:fs');
const path = require('node:path');

async function writeFile(content, path){
    try{
        fs.writeFileSync(path, content);
        console.log(`File created at ${path}.`);
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

async function logErrors(errs) {
    let content = errs.join('\n');
    if(!content || content === '') return;
    let logsPath = path.join(__dirname, '/../../../logs/');
    let filename = logsPath + 'errors.txt';
    writeFile(content, filename);
}

function getDate(){
    const now = new Date();

    // Obter as partes da data e hora
    const hours = String(now.getHours()).padStart(2, '0'); // Hora com 2 dígitos
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos
    const day = String(now.getDate()).padStart(2, '0'); // Dia com 2 dígitos
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês (0-indexed, então somamos 1)
    const year = now.getFullYear(); // Ano com 4 dígitos

    return `${hours}:${minutes}-${day}-${month}-${year}`;
}

module.exports = { 
    writeFile,
    jsonToCsv,
    logErrors
};