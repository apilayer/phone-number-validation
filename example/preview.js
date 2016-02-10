var API = require('phone-number-validation');
var api = new API({
    access_key: 'access_key'
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