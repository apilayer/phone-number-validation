'use strict';

var utils = require('../lib/utils');

var API = {};

API.countries = require('./countries');
API.validate = require('./validate');

API.get = function (name) {
    var api = utils.get(this, name);
    return api;
};

/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;