'use strict';

var utils = require('../lib/utils');
var Promise = require('../lib/promise');


// Declare our main module scope
var API;


/**
 * Countries List
 *
 * @param  {object} params - Parameters for request
 * @param  {callback} callback - The callback that handles the response.
 * @return {object} Result
 */
API = function (params, callback, options) {


    options = utils.defaults({}, options, this.options, {
            service: API.SERVICE_NAME,
            method: API.SERVICE_METHOD
        }
    );


    // Declare the promise we will use to wrap the request call
    var promise = new Promise(function (resolve, reject) {


        // Prepare Parameters and prepare it for the Request modus
        var query = {
            options: options,
            params: {
                json: true,
                qs: params
            }
        };


        var APIRequest = require('../lib/apirequest');
        APIRequest.request(query, function (err, result) {

            if (utils.isNull(err) && utils.has(result, 'error')) {
                err = utils.get(result, 'error');
            }

            // If an error happens, we return early
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });


    // Ensure callback is set to make the main functions slightly simpler by avoiding nested conditionals
    callback = callback || utils.noop;

    // We offer callback support in addition to promise style (we know callback is set as we default it in the beginning)
    promise
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        });


    // return the promise to the caller
    return promise;
};


var CountriesQuery = function (email) {
};
API.CountriesQuery = CountriesQuery;


API.SERVICE_NAME = 'countries';
API.SERVICE_METHOD = 'GET';


/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;