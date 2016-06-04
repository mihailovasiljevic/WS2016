var mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    Project = mongoose.model('Project'), // use mongoose to call module method to get project model
    errorHandler = require('../controllers/index.server.controller');
	
exports.report1 = function(req,res,next,id)
{	
	Project.findById(id)
	.populate('teamMembers')
	.exec(function(err, project){
		Task.find({"currentState.project":id})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {
			var map = {};  //says how many taks users did
			var indexies = {};
			for(var i = 0; i < project.teamMembers.length; i++) {
				map[project.teamMembers[i]._id] = 0;
			}
			map[-1] = 0;
			for(var i = 0; i < tasks.length; i++) {
				if(tasks[i].currentState.assignedFor != undefined) {
					map[tasks[i].currentState.assignedFor._id] = map[tasks[i].currentState.assignedFor._id] + 1;
				} else {
					map[-1] = map[-1] + 1;
				}
			}
			var report = [];
			
			for(var i = 0; i < project.teamMembers.length; i++) {
				var user = {};
				user.firstName = project.teamMembers[i].firstName;
				user.lastName = project.teamMembers[i].lastName;
				user.username = project.teamMembers[i].username;
				user.percantage = Math.round(((map[project.teamMembers[i]._id] / tasks.length) * 100) * 100) / 100;
				report.push(user);
			}
			
			user = {};
			user.firstName = "-1";
			user.lastName = "-1";
			user.username = "";
			user.percantage = Math.round(((map[-1] / tasks.length) * 100) * 100) / 100;
			report.push(user);
			res.send(report);
		});
	});
}

exports.report2 = function(req,res,next,id)
{
	Project.findById(id)
	.populate('teamMembers')
	.exec(function(err, project){
		Task.find({"currentState.project":id})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {
			var map = {};  //says how many taks users did
			var indexies = {};
			for(var i = 0; i < project.teamMembers.length; i++) {
				map[project.teamMembers[i]._id] = 0;
			}
			map[-1] = 0;
			for(var i = 0; i < tasks.length; i++) {
				if(tasks[i].currentState.assignedFor != undefined && tasks[i].currentState.status == 'Done') {
					map[tasks[i].currentState.assignedFor._id] = map[tasks[i].currentState.assignedFor._id] + 1;
				} else {
					map[-1] = map[-1] + 1;
				}
			}
			var report = [];
			
			for(var i = 0; i < project.teamMembers.length; i++) {
				var user = {};
				user.firstName = project.teamMembers[i].firstName;
				user.lastName = project.teamMembers[i].lastName;
				user.username = project.teamMembers[i].username;
				user.percantage = Math.round(((map[project.teamMembers[i]._id] / tasks.length) * 100) * 100) / 100;
				report.push(user);
			}
			
			user = {};
			user.firstName = "-1";
			user.lastName = "-1";
			user.username = "";
			user.percantage = Math.round(((map[-1] / tasks.length) * 100) * 100) / 100;
			report.push(user);
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

				console.log(report[normalDate]);
				console.log(JSON.stringify(report));
			}
			res.send(report);
		});
	});
}


exports.report5 = function(req,res,next,id){

	Project.findById(id)
	.exec(function(err, project){
		Task.find({"currentState.project":id,"currentState.status" : "Done"})
		.populate('currentState.assignedFor')
		.exec(function(err,tasks) {

			var niz=[];
			var brisanje=[];
			var brisanje1=[];

			report={};
			

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

								var korisnik= tasks[i].currentState.assignedFor.firstName;

							
								
									if(!report[normalDate,korisnik])
									{
										report[normalDate,korisnik] = 1;

									}else {

						
										report[normalDate,korisnik]++;
										

										for(var i=0;i<niz.length;i++){
											var name=niz[i].firstName;
											var index={};
											if(name==korisnik){
												index.vrednost=i;
												
												brisanje.push(index);
												brisanje1.push(index);

												
											}
										}

									}
							
							var user = {};
							user.firstName=korisnik;
							user.date=normalDate;
							user.number=report[normalDate,korisnik];
							niz.push(user);
								
				}

				

				var broj=0;

				for(var i=0;i<brisanje1.length;i++){
					var vred=brisanje1[i].vrednost;
					var ind=i+1;

					for(var j=ind;j<brisanje1.length;j++){
						var vred1=brisanje1[j].vrednost;
						console.log(vred);
						console.log(vred1);
						if(vred==vred1){
					
							brisanje.splice(broj,1);
							broj--;
							break;
						
						}
					}
					broj++;
				}
				
				brisanje.sort(function(a, b){
				 	return a.vrednost-b.vrednost
				})

				var br=0;

				for(var i=0;i<brisanje.length;i++){
					
					var vred=brisanje[i].vrednost;
					if(i!=0){
						br++;
						vred=vred-br;
					}
					
					niz.splice(vred,1);
					
				}



			res.send(niz);
		});
	});
}