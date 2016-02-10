'use strict';

var _ = require('lodash');
var Transporter = require('./transporter');
var APIResult = require('./apirequest-result');


var APIRequest = {};


/**
 * Create and send request to the API
 * @param  {object}   parameters Parameters used to form request
 * @param  {Function} callback   Callback when request finished or error found
 * @return {Request}             Returns Request object or null
 */
var requestFn = function (parameters, callback) {

    var url = parameters.options.secure ? 'https' : 'http';
    url += '://';
    url += parameters.options.host;
    url += '/';
    url += parameters.options.context;
    url += '/';
    url += parameters.options.service;
    url += '?' + parameters.options.key_type + '=' + parameters.options.access_key;

    parameters.options.url = url;

    // We need to be able to support using native HTTP since the Live endpoint is causing errors on the 304 which cant be handled by request.js library
    // Refer: https://github.com/request/request/issues/2048

    var transporter = new Transporter(parameters.options);
    transporter.req = transporter.request(parameters.params, function (err, result, response) {

        if (err) {
            return callback(err);
        }
        else if (response.statusCode != APIResult.OK || !result) {
            err = _.get(response, APIResult.BODY_ERROR_EXPR);
            return callback(err, result, response);
        }

        result = result || _.get(result, APIResult.BODY_EXPR) || null;

        return callback(null, result, response);
    });
    return transporter;
};
APIRequest.request = requestFn;


/**
 * Exports APIRequest
 * @type {Function}
 */
module.exports = APIRequest;