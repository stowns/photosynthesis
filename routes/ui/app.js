var models = require('../../models'),
    Event = models.Event,
    LOG_TAG = 'UI App: ',
    l = require('winston');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.event = function(req, res) {
  Event.findOne({ slug : req.params.slug }, function(err, doc) {
    if (err) console.log(err);
    if (doc == null) {
      l.info(LOG_TAG + 'redirecting to /');
      res.redirect('/');
    }

    res.render('index');
  });
};