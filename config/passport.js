var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
  var User = mongoose.model('User');

  passport.serializeUser(function(user, done){
    done(null, user.id); //when authentication is finished _id will be put on session
  });

// later when user is needed we'll use id from session, but we tell mongose not to
// give us back passport and salt properties
  passport.deserializeUser(function(id, done){
    User.findOne({
      _id: id
    }, '-password -salt', function(err, user){
      done(err, user);
    });
  });
  require('./strategies/local.js')();
}
