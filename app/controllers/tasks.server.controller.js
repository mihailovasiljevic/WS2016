var Task = require('mongoose').model('Task'); // use mongoose to call module method to get task model

exports.create = function(req, res, next){
    var task = new Task(req.body);
    task.save(function(err) {
        if (err) {
         return next(err);
        } else {
            res.json(task);
        }
    });
};

exports.list = function(req, res, next){
  Task.find({}, function(err, tasks){
    if(err){
      return next(err);
    }else {
      res.json(tasks);
    }
  });
};

exports.read = function(req, res){
  res.json(req.task);
};

exports.taskByID = function(req, res, next, id){
  Task.findOne({
    _id: id
  }, function(err, task){
    if(err){
      return next(err);
    }else {
      req.task = task;
      next();
    }
  });
};

exports.update = function(req, res, next){
  Task.findByIdAndUpdate(req.task.id, req.body, function(err, task){
    if(err){
      return next(err);
    }else{
      res.json(task);
    }
  });
};

exports.delete = function(req, res, next){
  req.task.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.task);
    }
  });
};
