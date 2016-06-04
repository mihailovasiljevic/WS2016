var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    User = mongoose.model('User'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');

exports.create = function(req, res, next){
  
  
  
    var project = new Project(req.body);

  //  project.creator = req.user._id;

    
        updateUsers(project,project.teamMembers, function(){
          console.log("KONACAN USPEH!");
          res.send(JSON.stringify(project));
        });




};

function updateUsers(project, collection, callback){
  var usersIds = collection.slice(0);//clone collection;
  (function updateUsers(){
         var item = usersIds.splice(0,1)[0];
         console.log("Pokusaj cuvanja: " + item);
         User.findById(item)
        .exec(function(err, user){
          if (err) return next(err);
     //     if(!user) return next(new Error('Failed to load project ' + item));

          project.save(function(err) {
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                  user.projects.push(project);
                  console.log(JSON.stringify(user.projects));
                  User.findByIdAndUpdate(user.id, user, function(err, user){
                    if(err){
                        return res.status(400).send({
                          message: errorHandler.getErrorMessage(err)
                        }); 
                    }else{
                       console.log("\nUspesno sacuvan "+item);
                       if(usersIds.length == 0)
                        callback();
                       else
                        updateUsers();
                    }
                  });              
                

              }
          });     
          
        });       
    })();
}

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
 console.log(JSON.stringify(req.body))
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