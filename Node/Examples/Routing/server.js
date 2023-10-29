const express = require('express');
const app = express();
const { logger } = require('./middlewares/LogEvents');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3500;

//Middlewares

//'content-type': application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Built-in middleware to deal with Json
app.use(express.json());

// Built-in middleware to deal with static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//Custom middleware
app.use(logger);

//Dependency middleware to cross origin resourrce sharing
const domainList = ['http://localhost:3500', undefined  ]
const corsOption = {
    origin: (origin, callback) => {
        if(domainList.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS !!'));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOption));  

//Routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

// 404 route should be on end of routes
app.all('*', (req, res) => {
    res.status(404);
    if( req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({ error: "404 Not Found"});
    }else{
        res.type('txt').send("404 Not Found");
    }
    
});

//Custom middleware to handle errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))

