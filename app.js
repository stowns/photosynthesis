
/**
 * Module dependencies.
 */

var config = require('./config'),
  express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  models = require('./models'),
  User = models.User,
  AppError = models.AppError,
  MongoStore = require('connect-mongo')(express)
  sessionStore = new MongoStore({ url: config.mongodb });

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// connect the database
mongoose.connect(config.mongodb);



/////////
// ROUTES
/////////

// API FIRST!
// Do not call res.send(), res.json(), etc. in API route functions
// Instead, within each API route, set res.jsonData to the JSON data, then call next()
// This will allow us to write UI route functions that piggyback on the API functions
//
// Example API function for /api/me:
/*
  exports.show = function(req, res, next) {
    res.jsonData = req.user;
    next();
  };
*/
var sendJson = function(req, res) { res.json(res.jsonData); }
app.get('/api/me', routes.api.me.show);
app.post('/api/album/:name', routes.api.album.create);
app.post('/api/album/:id/image', routes.api.album.addImage);
app.post('/api/event', routes.api.event.create);
app.get('/api/event/:slug', routes.api.event.retrieve);

// this catch-all route will send JSON for every API route that falls through to this point in the chain
// WARNING: Sometimes they don't fall through to this point in the chain! Example:
//
// app.get('/api/users/someNonStandardService', routes.api.users.someNonStandardService);
// app.get('/api/users/:id', routes.api.users.show)
//
// In this case the next() of `someNonStandardService` is the `show` route, but we want to send json
// So explicitly tell the `someNonStandardService` that its `next` is the `sendJson` function:
//
// app.get('/api/users/someNonStandardService', routes.api.users.someNonStandardService, sendJson);
// 
app.all('/api/*', sendJson);

// UI routes
// Within each UI route function, call the corresponding API function.
// Grab the API response data from res.jsonData and render as needed.
//
// Example UI function for /me:
/*
  var me = require('../api/me');
  exports.show = function(req, res) {
    me.show(req, res, function() {
      res.render('me/index', { title: 'Profile', user: res.jsonData });
    });
  };
*/

app.get('/', routes.ui.app.index);
app.get('/event/:slug', routes.ui.app.event);
app.get('/partials/:name', routes.ui.app.partials);
// redirect all others to the index (HTML5 history)
app.get('*', routes.ui.app.index);

// handle errors
// process.on('uncaughtException', function (exception) {
//   console.log('AppError: ' + exception);
//   var error = new AppError();
//   error.message = exception;
//   error.save();
// });

// Start server

app.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
