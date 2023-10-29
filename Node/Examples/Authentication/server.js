const express = require('express');
const app = express();
const { logger } = require('./middlewares/LogEvents');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const corsOption = require('./config/corsOptions');
const path = require('path');
const PORT = process.env.PORT || 3500;

//Middlewares

//'content-type': application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Built-in middleware to deal with Json
app.use(express.json());

// Built-in middleware to deal with static files
app.use('/', express.static(path.join(__dirname, '/public')));

//Custom middleware
app.use(logger);

//Dependency middleware to cross origin resourrce sharing
app.use(cors(corsOption));  

//Routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));
app.use('/auth', require('./routes/api/auth'));

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

