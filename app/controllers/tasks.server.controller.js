var mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    Project = mongoose.model('Project'), 
    User = mongoose.model('User'),// use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');

exports.create = function(req, res, next){
    var task = new Task(req.body);
    
    //task.currentState.author = req.user._id;  // stavio sam author umesto creator
   
    var projectId = req.body.currentState.project._id;
    
    Project.findById(projectId)
    .exec(function(err, project){
      if (err) return next(err);
      if(!project) return next(new Error('Failed to load project ' + projectId));
      console.log(JSON.stringify(req.body));
      task.currentState.mark = project.title + project.taskNumber;
      //do saving if project is found
      task.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            
              //increase number of tasks if save completed well
              project.taskNumber++;
              project.tasks.push(task);
              //update project
              Project.findByIdAndUpdate(project.id, project, function(err, project){
                if(err){
                    return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                    }); 
                }else{
                   
                    User.findById(task.currentState.assignedFor)
                    .exec(function(err, user){
                      if (err) return next(err);
                      if(!user) return next(new Error('Failed to load project ' + task.currentState.assignedFor));
                      user.tasks.push(task);
                      User.findByIdAndUpdate(user.id, user, function(err, user){
                        if(err){
                            return res.status(400).send({
                              message: errorHandler.getErrorMessage(err)
                            }); 
                        }else{
                            console.log("\nUspesno sacuvan "+task.currentState.assignedFor);
                            res.json(task);
                        }
                      });              
                    }); 
                  
                }
              });              
            

          }
      });     
      
     // next();
    });    
    
   
};

function updateUsers( collection, callback){
  var usersIds = collection.slice(0);//clone collection;
  (function updateUsers(){
         var item = usersIds.splice(0,1)[0];
         console.log("Pokusaj cuvanja: " + item);
      
    })();
}

exports.list = function(req, res, next){

  Task.find().sort('-createdAt')
	.populate('currentState.author')
	.populate('currentState.assignedFor')
	.populate('currentState.project')
  .populate('currentState.comments')
	.exec(function(err, tasks){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else {
      res.json(tasks);
    }    
  });
};

exports.read = function(req, res){
  res.json(req.task);
};

exports.taskByID = function(req, res, next, id){

  Task.findById(id).populate('currentState.assignedFor')
  .populate('currentState.author')
  .populate('history.assignedFor')
  .exec(function(err, task){
    if (err) return next(err);
    if(!task) return next(new Error('Failed to load task ' + id));
    
    req.task = task;
    
    next();    
  });
 
};

exports.update = function(req, res, next){

  req.task.currentState.updatedAt = new Date();
  var currentState = req.task.currentState;
  
  req.task.history.push(currentState);
  
  Task.findByIdAndUpdate(req.task.id, req.task, function(err, task){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else{
      res.json(task);
    }
  });
};

exports.delete = function(req, res, next){
  
    console.log(req.task);
    projectId = req.task.currentState.project;
    
     Project.findById(projectId)
    .exec(function(err, project){
      if (err) return next(err);
      if(!project) return next(new Error('Failed to load project ' + projectId));
      
      var index = project.tasks.indexOf(req.task._id);
      
      console.log(index);
             
      
      req.task.remove(function(err){
        if(err){
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            }); 
        }else{
              project.tasks.splice(index,1);
              Project.findByIdAndUpdate(project.id, project, function(err, project){
                if(err){
                    return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                    }); 
                }else{
                  res.json(req.task);
                }
              });    
        }
      });  
      
     // next();
    });   
  
};
