const { errorLogger } = require('./LogEvents');

const errorHandler = (err, req, res, next) => {
    errorLogger(err, next);
    console.log(err.stack);
    res.status(500).send(err.message);
};

module.exports = { errorHandler }