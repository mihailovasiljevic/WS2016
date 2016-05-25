var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app){

/*
    app.route('/users')
    .post(users.create)
    .get(users.list);
    app.route('/users/:userId')
      .get(users.read)
      .put(users.update)
      .delete(users.delete);
    app.param('userId', users.userByID);

    app.route('/signup')
      .get(users.renderSignUp)
      .post(users.signup);
     
*/
      
app.post('/api/login',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ message : 'authentication failed', information : info, error : err });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ message : 'Success', user : req.user });
    });      
  })(req, res, next);
  });
    app.route('/api/logout')
        .get(users.signout);
      
      //is already logged in?
      app.route('/loggedin')
        .get(function(req, res){
          res.end(req.isAuthenticated() ? req.user : '0');
        });
     app.route('/api/sendMe')
      .get(function(req, res){
          res.json(req.user);
        });   
     app.route('/api/failure')
      .get(function(req, res){
          res.json(req.flash('error'));
        });  
     app.route('/api/users/me')
        .get(users.me);
        
    app.route('/api/users')
    .post(users.create)
    .get(users.list);
    app.route('/api/users/:userId')
      .get(users.read)
      .put(users.update)
      .delete(users.delete);
    app.param('userId', users.userByID);
}
