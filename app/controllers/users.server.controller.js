var User = require('mongoose').model('User'),
    passport = require('passport'),
      _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/config'); // use mongoose to call module method to get User model

var getErrorMessage = function(err){
  var message = '';

  if(err.code){
    switch(err.code){
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrog';
    }
  } else {
    for(var errName in err.errors){
      if(err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.renderSignIn = function(req, res, next){
  // if user is not logged in show him sign in form if it is show him index page
  if(!req.user){
    res.render('signin', {
      title: 'Sign-in form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

exports.renderSignUp = function(req, res, next){
  //if user is not signed in show him signup page if it is show him index page
  if(!req.user){
    res.render('signup',{
      title: 'Sign-up form',
      messages: req.flash('error')
    });
  }else{
    return res.redirect('/');
  }
}

exports.signup = function(req, res, next){
  if(!req.user){
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function(err){
      if(err){
        var message = getErrorMessage(err);

        req.flash('errr', message);
        return res.redirect('/signup');
      }
      req.login(user, function(err){
        if(err) return next(err);
        return res.redirect('/');
      });
    });
  }else{
    return res.redirect('/');
  }
};

/**
 * Show login form
 */
exports.signin = function(req, res){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  res.redirect('/login');
}

/**
 * Logout
 */
exports.signout = function(req, res){
  req.logout();
  res.redirect('/');
}

/**
 * Session
 */

exports.session = function(req, res){
  res.redirect('/');
}

exports.me = function(req, res){
  if(!req.user || req.user.hasOwnProperty('_id')) return res.send(null);
  
  User.findOne({
    _id: req.user._id
  }).exec(function(err, user){
    if(err || !user) return res.send(null);
    
    var dbUser= user.toJSON();
    var id = req.user._id;
    
    delete dbUser._id;
    delete req.user._id;
    
    var eq = _.isEqual(dbUser, req.user);
    if(eq){
      req.user._id = id;
      return res.json(req.user);
    }

  });
  
};

exports.create = function(req, res, next){
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
         return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next){
  User.find({}, function(err, users){
    if(err){
      return next(err);
    }else {
      res.json(users);
    }
  });
};

exports.read = function(req, res){
  res.json(req.user);
};

exports.userByID = function(req, res, next, id){
  User.findOne({
    _id: id
  }, function(err, user){
    if(err){
      return next(err);
    }else {
      req.user = user;
      next();
    }
  });
};

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
    if(err){
      return next(err);
    }else{
      res.json(user);
    }
  });
};

exports.delete = function(req, res, next){
  req.user.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.user);
    }
  });
};

exports.requiresLogin = function(req, res, next){
  
  if(!req.isAuthenticated()){
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }
  
  next();
}