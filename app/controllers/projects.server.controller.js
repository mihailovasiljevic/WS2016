var mongoose = require('mongoose'),
    Project = mongoose.model('Project'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');
    
    
exports.create = function(req, res, next){
    console.log('presave');
	var project = new Project(req.body);
    //project.creator = req.user;
    console.log('save');
    project.save(function(err) {
        if (err) {
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         });
        } else {
            res.json(project);
        }
    });
};

exports.list = function(req, res, next){
  
  Project.find().sort('-created')
  .populate('creator')
  .populate('teamMembers')
  .populate('tasks')
  .exec(function(err, projects){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         });      
    } else {
      res.json(projects);
    }
  });

};

exports.read = function(req, res){
  res.json(req.project);
};

exports.projectByID = function(req, res, next, id){
  Project.findById(id)
  .populate('creator')
  .populate('teamMembers')
  .populate('tasks')
  .exec(function(err, project){
    if (err) return next(err);
    if(!project) return next(new Error('Failed to load project ' + id));
    
    req.project = project;
    
    next();
  });
};

exports.update = function(req, res, next){
  Project.findByIdAndUpdate(req.project.id, req.body, function(err, project){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else{
      res.json(project);
    }
  });
};

exports.delete = function(req, res, next){
  req.project.remove(function(err){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else{
      res.json(req.project);
    }
  });
};

exports.hasAuthorization = function(req, res, next){
  if(req.project.creator.id !== req.user.id){
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  
  next();
}