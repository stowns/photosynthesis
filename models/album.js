
var mongoose = exports.mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , bcrypt = require('bcrypt')
  , Schema = mongoose.Schema;

mongooseTypes.loadTypes(mongoose, "email");
var Email = Schema.Types.Email;

exports = module.exports = new Schema({

  name: { type: String },
  email: { type: Email },
  salt: { type: String },
  hash: { type: String },
  images: [{ type : Schema.ObjectId, ref: 'Image' }]

});