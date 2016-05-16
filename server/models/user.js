var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  username: {
    type: String,
    required: true,
	unique: true,
  },
  email: {
    type: String,
    required: true,
	unique: true,
  },
  name: String,
  surname: String,
  roles: {
    type: Array,
    default: ['administrator', 'user']
  },

});


var User = mongoose.model('User', userSchema);
module.exports = User;
