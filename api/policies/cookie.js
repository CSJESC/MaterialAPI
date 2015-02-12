/**
 * Cookie
 *
 * @module      :: Policy
 * @description :: Simple policy to push a cookie for authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  res.cookie('OA', req.isAuthenticated());

  next();
};
