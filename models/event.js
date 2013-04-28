var mongoose = exports.mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , bcrypt = require('bcrypt')
  , Schema = mongoose.Schema
  , slug = require('mongoose-slug');
 
;
mongooseTypes.loadTypes(mongoose, "email");
var Email = Schema.Types.Email;

exports = module.exports = new Schema({

  name: { type: String },
  slug: { type: String}

});

exports.plugin(slug('name'));
