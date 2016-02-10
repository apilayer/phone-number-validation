var path = require('path');

var APIPath = path.join(__dirname, '../', 'index');
var API = require(APIPath);

var api = new API({
    access_key: process.env.ACCESS_KEY
});

var number = '14158586273';
var validateQuery = {
    number: number
};
api.validate(validateQuery, function (err, result) {
    if (err) {
        return console.log('Validate Callback (Error): ' + JSON.stringify(err));
    }
    console.log('Validate Callback (Success): '+ JSON.stringify(result));
});

var countriesQuery = {
};
api.countries(countriesQuery, function (err, result) {
    if (err) {
        return console.log('Countries Callback (Error): ' + JSON.stringify(err));
    }
    console.log('Countries Callback (Success): '+ JSON.stringify(result));
});