const fs = require('fs');

//Creating directory
if(!fs.existsSync('./new')){
    fs.mkdir( './new', (err) => {
        if (err) throw err;
    })
}

//Deleting directory
if(fs.existsSync('./new')){
    fs.rmdir( './new', (err) => {
        if (err) throw err;
    })
}
