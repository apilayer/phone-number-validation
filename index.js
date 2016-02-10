'use strict';

var utils = require('./lib/utils');

/**
 * A module for interacting with mailboxlayer API
 * @module screenshotlayer
 */

/**
 * mailboxlayer constructor.
 * @param {object} options Options to be passed in
 * @constructor
 */
function API(options) {

    this.options = utils.extend(
        {},
        options,
        {
            host: 'apilayer.net',
            context: 'api',
            key_type: 'access_key',
            secure: false
        }
    );

    /**
     * Load the apis from apis directory
     * This file holds all version information
     * @private
     */
    var apis = require('./api');
    this.addAPIs(apis);
}

/**
 * Add API endpoints to object
 *
 * @param {Array} api Api to be added
 * @private
 */
API.prototype.addAPIs = function (apis) {

    for (var apiName in apis) {

        var API = apis[apiName];
        var api = API.bind(this);
        utils.extend(api, API);

        this[apiName] = api;
    }
};

/**
 * Export API
 */
module.exports = API;