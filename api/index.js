'use strict';

var _ = require('lodash');

var API = {};

API.validate = require('./validate');

API.get = function (name) {
    var api = _.get(this, name);
    return api;
};

/**
 * Exports the APIs
 * @type {Object}
 */
module.exports = API;