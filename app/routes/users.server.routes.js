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
      
    app.route('/api/login')
      .get(users.renderSignIn)
      .post(passport.authenticate('local', {
        successRedirect: '/api/sendMe',
        failureRedirect: '/#!/login',
        failureFlash: true
      }));
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
     app.route('/api/users/me')
        .get(users.me);
}
