var models = require('../../models'),
    Event = models.Event,
    Album = models.Album,
    LOG_TAG = 'Event API: ',
    l = require('winston'),
    async = require('async');


exports.create = function(req, res, next) {
  var e = new Event({ name : req.param('name') });
  e.save(function(err, doc) {
    if (err) l.info(LOG_TAG + err.message);
    console.log(doc);
    res.jsonData = doc;
    next();
  });
};

exports.retrieve = function(req, res, next) {
  l.info(LOG_TAG + 'retrieve');

  async.waterfall([
    function(callback){
      Event.findOne({ slug : req.params.slug })
        .lean()
        .exec(function(err, event) {
          if (err) l.info(LOG_TAG + err.message);
          callback(null, event);
        });
    },
    function(event, callback){
      Album.find({ event : event._id })
        .populate('images')
        .exec(function(err, albums) {
          if (err) l.info(LOG_TAG + err.message);
          // // ghetto but I can't lean the 'images' populate and we want the
          // // virtual getters to be available on each image
          var albumsArr = new Array();
          for (a in albums) {
            var imagesArr = new Array();
            var imagesWithLocationArr = new Array();
            for (i in albums[a].images) {
              console.log(albums[a].images[i]);
              if (albums[a].images[i].latitude && albums[a].images[i].latitude) {
                imagesWithLocationArr.push(albums[a].images[i]);
              } else {
                imagesArr.push(albums[a].images[i]);
              }
            }
            albums[a] = albums[a].toObject();
            albums[a].images = imagesArr;
            albums[a].imagesWithLocation = imagesWithLocationArr;
            albumsArr.push(albums[a]);
          }
          event.albums = albumsArr;
          // event.albums = albumsArr;
          callback(null, event)
        });
    },
  ], function (err, result) {
     // result now equals 'done'   
      res.jsonData = result;
      next();
  });
  
};