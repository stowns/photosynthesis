
var mongoose = exports.mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , bcrypt = require('bcrypt')
  , Schema = mongoose.Schema
;
mongooseTypes.loadTypes(mongoose, "email");
var Email = Schema.Types.Email;

exports = module.exports = new Schema({

  name: { type: String },
  email: { type: Email },
  salt: { type: String },
  hash: { type: String }

});

exports.virtual('password')
  .get(function() {
    return this._password;
  })
  .set(function(password) {
    this._password = password;
    var salt = this.salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, salt);
  })
;

exports.method('checkPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});