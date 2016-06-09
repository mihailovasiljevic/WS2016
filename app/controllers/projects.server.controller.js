var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    User = mongoose.model('User'),
    Task = mongoose.model('Task'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller'),
    ObjectId = require('mongoose').Types.ObjectId; 

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
      console.log("====================");
      console.log("Comparing: "+projectTeamMembers[i]._id + " and: " + reqTeamMembers[j]._id);
      console.log("Result is:  "+ (JSON.stringify(projectTeamMembers[i]._id) == JSON.stringify(reqTeamMembers[j]._id)));
      console.log("====================");
      if(JSON.stringify(projectTeamMembers[i]._id) == JSON.stringify(reqTeamMembers[j]._id)){
        newIsOld = true;
        break;
      }
    }
    if(!newIsOld){
      teamMembersForExclusion.push(projectTeamMembers[i]._id);
    }
  }
  
  for(var i = 0; i < reqTeamMembers.length; i++){
    var oldIsNew = false;
    for(var j = 0; j < projectTeamMembers.length; j++){
      console.log("====================");
      console.log("Comparing: "+projectTeamMembers[j]._id + " and: " + reqTeamMembers[i]._id);
      console.log("Result is:  "+ (projectTeamMembers[j]._id == reqTeamMembers[i]._id));
      console.log("====================");
      if(JSON.stringify(reqTeamMembers[i]._id) == JSON.stringify(projectTeamMembers[j]._id)){
        oldIsNew = true;
        break;
      }
    }
    if(!oldIsNew){
      teamMembersForAddition.push(reqTeamMembers[i]._id);
    }
  }
 
  
};
function excludeUsers(project, teamMembersForExclusion,res, callback){

  var usersIds = teamMembersForExclusion.slice(0);//clone collection;
  
  (function excludeUsers(){
         var item = usersIds.splice(0,1)[0];
         User.findById(item)
        .exec(function(err, user){
          if (err) return next(err);
          console.log("projectId " + project._id);
          var index = user.projects.indexOf(project._id);
          console.log("index "+index);
          user.projects.splice(index,1);
          console.log("project_id: " + user._id );
          console.log("ObjectId(project._id): " + ObjectId(user._id) );
          Task
          .find({ 'currentState.assignedFor': ObjectId(user._id)})
          .exec(function(err, tasks){
            console.log("TASKS: " + tasks.length);
            if(err || !tasks) return next(err);
            
            if(tasks.length != 0){
              for(var i = 0; i < tasks.length; i++){
                for(var j = 0; j < user.tasks.length; j++){
                  console.log("====== EXCLUDING FROM TASK =========");
                  console.log("user.tasks[j]: " + user.tasks[j]);
                  console.log("user.tasks[j]._id "+ user.tasks[j]._id);
                  console.log("Comparing: "+tasks[i]._id + " and: " + user.tasks[j]);
                  console.log("Result is:  "+ (JSON.stringify(tasks[i]._id) == JSON.stringify(user.tasks[j])));
                  console.log("====================");
                  if(JSON.stringify(tasks[i]._id) == JSON.stringify(user.tasks[j])){
                    user.tasks.splice(j,1);
                    break;
                  }
                }
              }
            }
            
            User.findByIdAndUpdate(user.id, user, function(err, user){
              if(err){
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  }); 
              }else{
                  if(usersIds.length == 0)
                    callback();
                  else{
                    excludeUsers();
                  }
              }
            }); 

          });  
          
        });       
    })();
}

function addUsers(project, teamMembersForAddition,res, callback){
  var usersIds = teamMembersForAddition.slice(0);//clone collection;
  (function addUsers(){
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
 // reqTeamMembers.push(req.user);
 //console.log(req.body.teamMembers);
// console.log(req.project);
 // for(var i = 0; i < req.project.teamMembers.length; i++){
//    console.log(req.project.teamMembers[i]._id)
 // }
  reqTeamMembers.push(req.user);
  console.log("REQ.USER: "+req.user);
  Project.findById(req.project._id)
  .populate('creator')
  .populate('teamMembers')
  .populate('tasks')
  .exec(function(err, project){
    if (err) return next(err);
    if(!project) return next(new Error('Failed to load project ' + id));
    
    var projectTeamMembers = project.teamMembers;

    console.log("Project team members: " );
    for(var i = 0; i < projectTeamMembers.length; i++){
      console.log("id: " + projectTeamMembers[i]._id);
    }
    console.log("Req team members: ");   
    for(var i = 0; i < reqTeamMembers.length; i++){
      console.log("id: " + reqTeamMembers[i]._id);
    }     
    var equal = testEqual(reqTeamMembers, projectTeamMembers);
    console.log("Collections testEqual(): " + equal);
    
    //ako nema razlike u clanovima tima, nije ni doslo do promene
    if(equal){
      
      res.json(project);
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
          console.log("For exclusion: " + JSON.stringify(teamMembersForExclusion));
          console.log("For addition: " + JSON.stringify(teamMembersForAddition));
          
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