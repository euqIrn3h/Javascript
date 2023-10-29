//Streams are way usefull when dealing with larger files
const fs = require('fs');

const readStream = fs.createReadStream('./files/Large.txt', { encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./files/New-Large.txt');

readStream.pipe(writeStream);


