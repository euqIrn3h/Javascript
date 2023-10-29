const logEvents = require('./LogEvents');
const EventEmiter = require('events');

class MyEmiter extends EventEmiter {};

const myEmiter = new MyEmiter();


myEmiter.on( 'log', (msg) => logEvents(msg));

setTimeout( () => {
    myEmiter.emit('log', "Log event emited !");
}, 2000);