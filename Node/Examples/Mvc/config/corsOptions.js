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

module.exports = corsOption;