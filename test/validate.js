var path = require('path');

var APIPath = path.join(__dirname, '../', 'index');
var API = require(APIPath);

var api = new API({
    access_key: process.env.ACCESS_KEY
});

// TEST START
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

describe('#validate()', function () {

    this.timeout(20000);

    it('basic', function (done) {

        var number = '14158586273';

        // Check Query
        var query = {
            number: number
        };

        api.validate(query)
            .then(function (result) {

                expect(result).is.not.null;
                expect(result).property('number').equals(number);

                done(null, result);
            })
            .catch(function (err) {
                done(err);
            });
    });
});