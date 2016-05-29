var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'), // use mongoose to call module method to get project model
    Task = mongoose.model('Task'),
    errorHandler = require('../controllers/index.server.controller');

exports.create = function(req, res, next){
    var comment = new Comment(req.body);
    
    //task.author = req.user;  // stavio sam author umesto creator
    
    var taskId = req.body.task._id;
    
    Task.findById(taskId)
    .exec(function(err, task){
      if (err) return next(err);
      if(!task) return next(new Error('Failed to load task ' + taskId));
      //console.log(JSON.stringify(req.body));
      //do saving if project is found
      comment.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
              task.currentState.comments.push(comment);
              //update project
              Task.findByIdAndUpdate(task.id, task, function(err, task){
                if(err){
                    return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                    }); 
                }else{
                  res.json(comment);
                }
              });              
            

          }
      });     
      
     // next();
    });    
    
};

exports.list = function(req, res, next){
  
  Comment.find().sort('-createdAt').exec(function(err, comments){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else {
      res.json(comments);
    }    
  });
};

exports.read = function(req, res){
  res.json(req.comment);
};

exports.commentByID = function(req, res, next, id){
  
  Comment.findById(id).exec(function(err, comment){
    if (err) return next(err);
    if(!comment) return next(new Error('Failed to load comment ' + id));
    
    req.comment = comment;
    
    next();    
  });
 
};

exports.update = function(req, res, next){
  req.comment.updatedAt = new Date();

  Comment.findByIdAndUpdate(req.comment.id, req.body, function(err, comment){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else{
      res.json(comment);
    }
  });
};

exports.delete = function(req, res, next){
  console.log(req.comment);
    taskId = req.comment.task;
    
     Task.findById(taskId)
    .exec(function(err, task){
      if (err) return next(err);
      if(!task) return next(new Error('Failed to load task ' + taskId));
      

      
      req.comment.remove(function(err){
        if(err){
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            }); 
        }else{
              var index = task.currentState.comments.indexOf(req.comment);
      
              task.currentState.comments.splice(index,1);
              Task.findByIdAndUpdate(task.id, task, function(err, task){
                if(err){
                    return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                    }); 
                }else{
                  res.json(req.comment);
                }
              });    
        }
      });  
      
     // next();
    });    

};
