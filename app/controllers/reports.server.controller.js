var mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    Project = mongoose.model('Project'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');
	
exports.report1 = function(req,res,next,id)
{
	Project.findById(id)
	.exec(function(err, project){
		Task.find({"currentState.project":id})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {
			var map = {};  //says how many taks users did
			var indexies = {};
			for(var i = 0; i < tasks.length; i++) {
				if(map[tasks[i].currentState.assignedFor] == undefined) {
					map[tasks[i].currentState.assignedFor] = 0;
					indexies[tasks[i].currentState.assignedFor] = i;
				}
				map[tasks[i].currentState.assignedFor] = map[tasks[i].currentState.assignedFor] + 1;
			}
			var report = [];
			for(var key in map) {
				var user = {};
				user.firstName = tasks[indexies[key]].currentState.assignedFor.firstName;
				user.lastName = tasks[indexies[key]].currentState.assignedFor.lastName;
				user.username = tasks[indexies[key]].currentState.assignedFor.username;
				user.percantage = Math.round(((map[key] / tasks.length)*100) * 100) / 100;
				report.push(user);
			}
			res.send(report);
		});
	});
}

exports.report2 = function(req,res,next,id)
{
	Project.findById(id)
	.exec(function(err, project){
		Task.find({"currentState.project":id, "currentState.status" : "Done"})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {
			console.log(tasks.length);
			var map = {};  //says how many taks users did
			var indexies = {};
			for(var i = 0; i < tasks.length; i++) {
				if(map[tasks[i].currentState.assignedFor] == undefined) {
					map[tasks[i].currentState.assignedFor] = 0;
					indexies[tasks[i].currentState.assignedFor] = i;
				}
				map[tasks[i].currentState.assignedFor] = map[tasks[i].currentState.assignedFor] + 1;
			}
			var report = [];
			for(var key in map) {
				var user = {};
				user.firstName = tasks[indexies[key]].currentState.assignedFor.firstName;
				user.lastName = tasks[indexies[key]].currentState.assignedFor.lastName;
				user.username = tasks[indexies[key]].currentState.assignedFor.username;
				user.percantage = Math.round(((map[key] / tasks.length)*100) * 100) / 100;
				report.push(user);
			}
			res.send(report);
		});
	});
}
