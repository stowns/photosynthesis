var models = require('../../models'),
    Event = models.Event,
    Image = models.Image,
    LOG_TAG = 'UI App: ',
    l = require('winston');
/*
 * GET home page.
 */

exports.index = function(req, res){
  return res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  return res.render('partials/' + name);
};

exports.event = function(req, res) {
  Event.findOne({ slug : req.params.slug }, function(err, doc) {
    if (err) console.log(err);
    if (doc == null) {
      l.info(LOG_TAG + 'redirecting to /');
      res.redirect('/');
    }

    return res.render('index');
  });
};

exports.image = function(req, res) {
  l.info (LOG_TAG + 'image');

  Image.findById(req.params.id, function(err, image) {
    if (err) return res.send(500);

    res.contentType(image.file.contentType);
    res.send(image.file.data);
  });
}