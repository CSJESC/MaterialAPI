/**
 * protectedAttributes
 *
 * @module      :: Policy
 * @description :: Simple policy to protect certain attributes as returned by Model.protectedAttributes()
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var actionUtil = require( '../../node_modules/sails/lib/hooks/blueprints/actionUtil' );

module.exports = function (req, res, next) {

    // Check for the "loggedInAt" field in the request
    if (req.param('youtube')) {
       return res.forbidden();
    }

    return next();
};