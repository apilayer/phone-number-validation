var path = require('path');
var async = require('async');

var utils = require('../lib/utils');

var APIPath = path.join(__dirname, '../', 'index');
var API = require(APIPath);

var api = new API({
    access_key: process.env.ACCESS_KEY
});

// TEST START
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');


describe('#countries()', function () {

    this.timeout(10000);

    it('result with equivalent to as many countries as found on the website', function (done) {

        async.waterfall(
            [
                function (stepCallback) {

                    // Call the file embdeded in the test folder
                    var fs = require('fs');
                    fs.readFile(path.join(__dirname, 'data', 'countries.json'), {encoding: 'UTF8'}, function (err, result) {
                        result = JSON.parse(result);
                        stepCallback(err, result);
                    });

                },
                function (countries, stepCallback) {
                    api.countries()
                        .then(function (result) {

                            var diff1 = utils.difference(utils.map(countries, 'country_name'), utils.map(result, 'country_name'));
                            assert.equal(0, diff1.length, 'Following countries are not found in the supported countries service: ' + diff1);

                            var diff2 = utils.difference(utils.map(result, 'country_name'), utils.map(countries, 'country_name'));
                            assert.equal(0, diff2.length, 'Following countries are not found on the website: ' + diff2);

                            stepCallback();
                        })
                        .catch(function (err) {
                            stepCallback(err);
                        });
                }
            ],
            function (err) {
                return done(err);
            }
        )
    });
});