var Project = require('mongoose').model('Project'); // use mongoose to call module method to get User model

exports.create = function(req, res, next){
    var project = new Project(req.body);
    project.save(function(err) {
        if (err) {
         return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next){
  Project.find({}, function(err, projects){
    if(err){
      return next(err);
    }else {
      res.json(projects);
    }
  });
};

exports.read = function(req, res){
  res.json(req.project);
};

exports.projectByID = function(req, res, next, id){
  Project.findOne({
    _id: id
  }, function(err, project){
    if(err){
      return next(err);
    }else {
      req.project = project;
      next();
    }
  });
};

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.project.id, req.body, function(err, project){
    if(err){
      return next(err);
    }else{
      res.json(project);
    }
  });
};

exports.delete = function(req, res, next){
  req.project.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.project);
    }
  });
};
