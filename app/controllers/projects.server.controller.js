var Project = require('mongoose').model('Project'); // use mongoose to call module method to get project model

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return
        err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res, next){
    var project = new Project(req.body);
    project.creator = req.user;

    project.save(function(err) {
        if (err) {
         return res.status(400).send({
           message: getErrorMessage(err);
         });
        } else {
            res.json(project);
        }
    });
};

exports.list = function(req, res, next){
  Project.find().populate('-created').populate('creator', 'fullName').exec(
    function(err, projects){
      if (err) {
       return res.status(400).send({
         message: getErrorMessage(err);
       });
     } else {
       res.json(projects);
     }
    }
  )
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
  Project.findByIdAndUpdate(req.project.id, req.body, function(err, project){
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
