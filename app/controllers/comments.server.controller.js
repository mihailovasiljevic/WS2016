var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');

exports.create = function(req, res, next){
    var comment = new Comment(req.body);
    comment.creator = req.user;
    
    comment.save(function(err) {
        if (err) {
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         });
        } else {
            res.json(comment);
        }
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
  req.comment.remove(function(err){
    if(err){
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         }); 
    }else{
      res.json(req.comment);
    }
  });
};
