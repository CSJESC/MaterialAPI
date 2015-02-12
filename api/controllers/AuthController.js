/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
var redirectRoute = '/discover/#uploader';

module.exports = {

    _config: {
      prefix: '',
      pluralize: false
    },

    index: function(req, res) {
        res.json({
            _csrf: res.locals._csrf
        });
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    // http://developer.github.com/v3/
    // http://developer.github.com/v3/oauth/#scopes
    github: function (req, res) {
        passport.authenticate('github', { failureRedirect: '/' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.forbidden('Login failed');
                        return;
                    }

                    res.redirect(redirectRoute);
                    return;
                });
            })(req, res);
    },

    // https://dev.twitter.com/docs/api/1.1
    // https://dev.twitter.com/docs/api/1.1#102
    twitter: function (req, res) {
        passport.authenticate('twitter', { failureRedirect: '/' },
            function (err, user) {
                req.logIn(res, function (err) {
                    if (err) {
                        console.log(err);
                        res.forbidden('Login failed');
                        return;
                    }

                    res.redirect(redirectRoute);
                    return;
                });
            })(req, res);
    },


    // https://developers.google.com/
    // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
    google: function (req, res) {
        passport.authenticate('google', { failureRedirect: '/', scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.forbidden('Login failed');
                        return;
                    }

                    res.redirect(redirectRoute);
                    return;
                });
            })(req, res);
    }

};
