/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */
var swagger = require("swagger-express");
var fs = require("fs-extra");
var path = require("path");

var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;
    // GoogleStrategy = require('passport-google-oauth').OAuth2Strategy


passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).exec(function (err, user) {
        done(err, user)
    });
});

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
       'startRequestTimer',
       'cookieParser',
       'session',
       'myRequestLogger',
       'bodyParser',
       'handleBodyParserError',
       'compress',
       'methodOverride',
       '$custom',
       'router',
       'www',
       'favicon',
       '404',
       '500'
     ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

  // myRequestLogger: function (req, res, next) {
  //     console.log("Requested :: ", req.method, req.url);
  //     return next();
  // },

  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    //bodyParser: require('skipper')

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000

  /***************************************************************************
  *                                                                          *
  * Custom Middleware using the express 'app' object                         *
  *                                                                          *
  ***************************************************************************/

  customMiddleware: function(app) {

    passport.use(new GitHubStrategy({
        clientID: sails.config.auth.github.consumerKey,
        clientSecret: sails.config.auth.github.consumerSecret,
        callbackURL: sails.config.basePath() + "/auth/github/callback"
      },
      login
    ));

    passport.use(new TwitterStrategy({
        consumerKey: sails.config.auth.twitter.consumerKey,
        consumerSecret: sails.config.auth.twitter.consumerSecret,
        callbackURL: sails.config.basePath() + "/auth/twitter/callback"
      },
      login
    ));

    /*passport.use(new GoogleStrategy({
        clientID: sails.config.auth.google.consumerKey,
        clientSecret: sails.config.auth.google.consumerSecret,
        callbackURL: sails.config.basePath() + "/auth/google/callback"
      },
      login
    ));*/
    
    
    var basePath = sails.config.basePath() + sails.config.blueprints.prefix;

    var files = fs.readdirSync(sails.config.swagger.docsFolder).map(function(file) {
      return path.resolve(sails.config.swagger.docsFolder, file);
    });

    app.disable('x-powered-by');

    app.use(swagger.init(app, {
      apiVersion: '1.0',
      swaggerVersion: sails.config.swagger.swaggerVersion,
      swaggerURL: sails.config.swagger.url,
      swaggerJSON: sails.config.swagger.apiDocs,
      swaggerUI: sails.config.swagger.uiDist,
      basePath: basePath,
      info: {
        title: sails.config.swagger.title,
        description: sails.config.swagger.description
      },
      apis: files
    })).use(passport.initialize())
      .use(passport.session());
  }

};
