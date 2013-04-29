var models = require('../../models'),
    Album = models.Album,
    Image = models.Image,
    LOG_TAG = 'Album API: ',
    l = require('winston');


exports.create = function(req, res, next) {
  l.info(LOG_TAG + 'create');

  console.log('eventId ' + req.param('eventId'));
  var a = new Album({ name : req.params.name, event : req.param('eventId') });
  a.save(function(err, doc) {
    if (err) return l.info(LOG_TAG, err.message);
    console.log(doc);
    res.jsonData = doc;
    next();
  });
};

exports.addImage = function(req, res, next) {
  l.info(LOG_TAG + 'addImage');
  console.log(req.params.id);
  Image.store(req.files.image, function(err, image) {
    if (err) return l.info(LOG_TAG + err.message);
    Album.findOne({ _id : req.params.id }, function(err, album) {
      if (err) return l.info(LOG_TAG + err.message);

      album.images.push(image.id);
      album.save(function(err, a) {
        if (err) return l.info(LOG_TAG + err.message);
        res.jsonData = image;
        next();
      });
    }); 
  });
};

