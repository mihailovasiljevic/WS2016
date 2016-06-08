var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    User = mongoose.model('User'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');

exports.create = function(req, res, next){
  
  
  
    var project = new Project(req.body);

     project.creator = req.user._id;

    project.teamMembers.push(req.user._id);
    Project.find({"title":project.title})
      .exec(function(err,response) {
          if(response.length > 0) {
            res.send({"forbidden":"true"});
          } else {
            updateUsers(project,project.teamMembers,res, function(){
              project.forbidden = false;
              res.send(JSON.stringify(project));
            });
          }
      });
      
}
   




function updateUsers(project, collection,res, callback){
  var usersIds = collection.slice(0);//clone collection;
  (function updateUsers(){
         var item = usersIds.splice(0,1)[0];
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
                  User.findByIdAndUpdate(user.id, user, function(err, user){
                    if(err){
                        return res.status(400).send({
                          message: errorHandler.getErrorMessage(err)
                        }); 
                    }else{
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

var testEqual = function(lst1, lst2){
  if(lst1.length != lst2.length)
    return false;
  
  
    
  for(var i = 0; i < lst1.length; i++){
    var found = false;
    for(var j = 0; j < lst2.length; j++){
      console.log("projectTeamMembers: " + JSON.stringify(lst1[i]._id));
      console.log("reqTeamMembers: " + JSON.stringify(lst2[j]._id));
      if(lst1[i]._id == lst2[j]._id){
        found = true;
        break;
      }
    }
    if(!found)
      return false;
  }
  return true;
};
/**
 * 
 */
var processTeammembers = function(projectTeamMembers, reqTeamMembers, teamMembersForExclusion, teamMembersForAddition){
  
  
  for(var i = 0; i < projectTeamMembers.length; i++){
    var newIsOld = false;
    for(var j = 0; j < reqTeamMembers.length; j++){
      
      if(projectTeamMembers[i]._id == reqTeamMembers[j]._id){
        newIsOld = true;
        break;
      }
    }
    if(!newIsOld)
      teamMembersForExclusion.push(projectTeamMembers[i]._id);
  }
  
  for(var i = 0; i < reqTeamMembers.length; i++){
    var oldIsNew = false;
    for(var j = 0; j < projectTeamMembers.length; j++){
      if(reqTeamMembers[i]._id == projectTeamMembers[j]._id){
        oldIsNew = true;
        break;
      }
    }
    if(!oldIsNew)
      teamMembersForAddition.push(reqTeamMembers[i]._id);
  }
  
};

function excludeUsers(project, collection,res, callback){

  var usersIds = collection.slice(0);//clone collection;
  (function updateUsers(){
         var item = usersIds.splice(0,1)[0];
         User.findById(item)
        .exec(function(err, user){
          if (err) return next(err);
      
          var index = user.projects.indexOf(project._id);
          console.log("index "+index);
          user.projects.splice(index,1);
          
          User.findByIdAndUpdate(user.id, user, function(err, user){
            if(err){
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                }); 
            }else{
                if(usersIds.length == 0)
                  callback();
                else
                  excludeUsers();
            }
          });   
          
        });       
    })();
}

function addUsers(project, collection,res, callback){

  var usersIds = collection.slice(0);//clone collection;
  (function updateUsers(){
         var item = usersIds.splice(0,1)[0];
         User.findById(item)
        .exec(function(err, user){
          if (err) return next(err);
      
          user.projects.push(project);
          
          User.findByIdAndUpdate(user.id, user, function(err, user){
            if(err){
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                }); 
            }else{
                if(usersIds.length == 0)
                  callback();
                else
                  addUsers();
            }
          });   
          
        });       
    })();
}
exports.update = function(req, res, next){
  
  var reqTeamMembers = req.body.teamMembers;
  
  if(reqTeamMembers == undefined)
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      }); 
  
  var projectTeamMembers = req.project.teamMembers;


  var equal = testEqual(reqTeamMembers, projectTeamMembers);
  console.log("Collections testEqual(): " + equal);
  
  //ako nema razlike u clanovima tima, nije ni doslo do promene
  if(equal){
    
    res.json(req.project);
    console.log("No changes in team members.");
    
  }else {
    //ako ima razlike u clanovima tima doslo je do promene, obradi promenu
    var teamMembersForExclusion = [];
    var teamMembersForAddition = [];
    processTeammembers(projectTeamMembers, reqTeamMembers, teamMembersForExclusion, teamMembersForAddition);
    console.log("For exclusion: " + JSON.stringify(teamMembersForExclusion));
    console.log("For addition: " + JSON.stringify(teamMembersForAddition));
    
     Project.findByIdAndUpdate(req.project.id, req.body, function(err, project){
      if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          }); 
      }else{
        if(teamMembersForExclusion.length > 0){
          excludeUsers(project,teamMembersForExclusion,res, function(){
            if(teamMembersForAddition.length > 0){
              addUsers(project,teamMembersForAddition,res, function(){
                  res.json(project);
              });   
            }else {
              res.json(project);
            }          
          }); 
        }else if(teamMembersForAddition.length > 0){
            addUsers(project,teamMembersForAddition,res, function(){
                res.json(project);
            });           
        }
      }
    });
    
  }
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