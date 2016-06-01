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
				if(tasks[indexies[key]].currentState.assignedFor){
				var user = {};
				user.firstName = tasks[indexies[key]].currentState.assignedFor.firstName;
				user.lastName = tasks[indexies[key]].currentState.assignedFor.lastName;
				user.username = tasks[indexies[key]].currentState.assignedFor.username;
				user.percantage = Math.round(((map[key] / tasks.length)*100) * 100) / 100;
				report.push(user);
			}
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
				if(tasks[indexies[key]].currentState.assignedFor){
				var user = {};
				user.firstName = tasks[indexies[key]].currentState.assignedFor.firstName;
				user.lastName = tasks[indexies[key]].currentState.assignedFor.lastName;
				user.username = tasks[indexies[key]].currentState.assignedFor.username;
				user.percantage = Math.round(((map[key] / tasks.length)*100) * 100) / 100;
				report.push(user);
			}
			}
			res.send(report);
		});
	});

}

exports.report3 = function(req,res,next,id){

	Project.findById(id)
	.exec(function(err, project){
		Task.find({"currentState.project":id})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {
			
			report={}
			for(var i=0; i<tasks.length; i++)
			{
				var date = new Date(tasks[i].currentState.createdAt);
				var normalDate=date.getFullYear().toString()+"/"+(date.getMonth() + 1).toString() + "/" + date.getDate().toString();
				if(!report[normalDate])
				{
					report[normalDate] = 1;

				}

				else report[normalDate]++;

				console.log(JSON.stringify(report));
			}
			res.send(report);
		});
	});
}

exports.report4 = function(req,res,next,id){

	Project.findById(id)
	.exec(function(err, project){
		Task.find({"currentState.project":id,"currentState.status" : "Done"})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {
			
			report={}
			for(var i=0; i<tasks.length; i++)
			{	
				date = new Date(tasks[i].currentState.createdAt);
				//Looking for the exact date when the task was done
				for(var j=tasks[i].history.length-1; j>=0; j--)
				{
					if(tasks[i].history[j].status!="Done")
					{
						if(j==tasks[i].history.length-1)
						{
							date=new Date(tasks[i].currentState.updatedAt);
						}
						else{
							date = new Date(tasks[i].history[j+1].updatedAt);
						}
						break;
					}

				}


				
				var normalDate=date.getFullYear().toString()+"/"+(date.getMonth() + 1).toString() + "/" + date.getDate().toString();
				if(!report[normalDate])
				{
					report[normalDate] = 1;

				}

				else report[normalDate]++;

				console.log(JSON.stringify(report));
			}
			res.send(report);
		});
	});
}