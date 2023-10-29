const fsPromisse = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try{
        //Read a file sync
        const data = await fsPromisse.readFile(path.join(__dirname, 'files', 'hello.txt'), 'utf-8');
        console.log(data);
        //Delete File sync
        await fsPromisse.unlink(path.join(__dirname, 'files', 'hello.txt'));
        //Write File sync
        await fsPromisse.writeFile(path.join(__dirname, 'files', 'new.txt'), 'Creating File');
        //Append or Create a File sync
        await fsPromisse.appendFile(path.join(__dirname, 'files', 'new.txt'), '\n\nAppending File');

    }
    catch(err){
        console.error(err)
    }
}

fileOps();

/*
Proccess mode actions
process.on( 'uncaughtException', err => {
    console.error( `Theres uncaught error: ${err}`);
    process.exit(1);
})
*/
