var mongoose = exports.mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , bcrypt = require('bcrypt')
  , Schema = mongoose.Schema
  , fs = require('fs')
  , im = require('imagemagick')
  , async = require('async');


exports = module.exports = new Schema({

  created_at    :  { type : Date, default: Date.now },
  description   : { type : String },
  location      : { type : [Number], index: '2d'}, // [lon, lat]
  file          : { data: Buffer, contentType: String }
});

exports.static('store', function(file, cb) {
  var img = new this;
  img.file.data = fs.readFileSync(file.path);
  img.file.contentType = file.type;
  
  
  im.readMetadata(file.path, function(err, metadata){
    if (err) cb(err, null);
    var lat = metadata.exif.gpsLatitude;
    var latRef = metadata.exif.gpsLatitudeRef;
    var lon = metadata.exif.gpsLongitude;
    var lonRef = metadata.exif.gpsLongitudeRef;

    if (lat && lon && latRef && lonRef) {
      lat = toDecimalDegress(lat, latRef);
      lon = toDecimalDegress(lon, lonRef);
      img.location = [lon, lat];
    }

    img.save(function (err, doc) {
      console.log('done');
      cb(err, doc);
    });
  })
});

    
var toDecimalDegress = function (value, ref) {
  value = value.split(',')

  for (v in value) {
    // clean up any whitespace
    value[v].trim();
  }

  var d = value[0].split('/');
  var m = value[1].split('/');
  var s = value[2].split('/');

  d = parseFloat(d[0]) / parseFloat(d[1]);
  m = parseFloat(m[0]) / parseFloat(m[1]);
  s = parseFloat(s[0]) / parseFloat(s[1]);
  var degrees = d + (m / 60.0) + (s / 3600.0);

  if ( ref == "S" || ref == "W") {
   
  } else {
     degrees = 0 - degrees;
  }                    
    
  return degrees; 
}