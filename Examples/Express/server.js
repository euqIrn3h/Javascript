const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//Next functions
const one = (req, res, next) => {
    console.log('One');
    next();
}

const two = (req, res, next) => {
    console.log('Two');
    next();
}

const three = (req, res, next) => {
    console.log('Three');
    res.send("Finished chain !");
}

app.get('^/$|/index(.html)?', (req, res) => {
    //res.send('Hello World!!');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('^/$|/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

/// Route Chain
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attemped to reach Hello World !!!');
    next();
}, (req, res) => {
    res.send('Hello World !!!');
});

app.get('/chain(.html)?', [one, two, three]);

// 404 route should be on end of routes
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))

