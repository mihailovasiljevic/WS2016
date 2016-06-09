angular.module('tasks').controller('listOfTasksCtrl', ['$scope', '$rootScope', '$location','Tasks','Projects','$state','Authentication','Users','$stateParams','$timeout',
    function($scope,$rootScope,$location,Tasks,Projects,$state,Authentication,Users,$stateParams,$timeout) {

		
		$scope.list = function() {

				if(!$stateParams.projectId){
				
				var tasksFromAuth ={};
				var tasks = [];
				var id = Authentication.user._id;
				Users.get({userId:id},function(response){
					tasksFromAuth=response.tasks;

					for(var i = 0; i < tasksFromAuth.length; i++) {
						Tasks.get({taskId:tasksFromAuth[i]},function(response){
	
						var task=loadTaskForTable(response);
						tasks.push(task);
						})
						
					}
				});
				$scope.allTasks = tasks;
				$scope.listOfTasks = tasks;
				for(var i = 0; i < $scope.listOfTasks.length; i++){
					console.log("ID: " + $scope.listOfTasks[i]._id);
				}
			}
			else{
				tasksFromProject = {};
				var tasks = [];
				var id = $stateParams.projectId;
				Projects.get({projectId:id},function(response){
					tasksFromProject=response.tasks;
				
					for(var i = 0; i < tasksFromProject.length; i++) {
						Tasks.get({taskId:tasksFromProject[i]._id},function(response){

						var task=loadTaskForTable(response);						
						tasks.push(task);
						})
						
					}
				});
				$scope.allTasks = tasks;
				$scope.listOfTasks = tasks;
				
				for(var i = 0; i < $scope.listOfTasks.length; i++){
					console.log("ID: " + $scope.listOfTasks[i]._id);
				}
			}


			function loadTaskForTable(response){
						if(response.currentState.author)
						var author =response.currentState.author.fullName;
						else author="--";
						if(response.currentState.assignedFor!=undefined)
						var assignedFor = response.currentState.assignedFor.fullName;
						else assignedFor="--";
						if(response.currentState.updatedAt != undefined) {
							var date = new Date(response.currentState.updatedAt);
							var updatedAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString()
								+ "  " + date.getHours().toString() + ":" + date.getMinutes().toString();
						} else {
							updatedAt = "";
						}
						var task = {
							"id": response._id,
							"mark": response.currentState.mark,
							"title": response.currentState.title,
							"author": author,
							"assignedFor": assignedFor,
							"status":response.currentState.status,
							"priority": response.currentState.priority,
							"updatedAt": updatedAt
						}
						return task;

			}
			/*
			Tasks.query(function(response) {
				var tasks = [];
				for(var i = 0; i < response.length; i++) {
					if(response[i].currentState.author)
					var author = response[i].currentState.author.firstName + response[i].currentState.author.lastName;
					else author="--";
					if(response[i].currentState.assignedFor!=undefined)
					var assignedFor = response[i].currentState.assignedFor.firstName + response[i].currentState.assignedFor.lastName;
					else assignedFor="--";
					var task = {
						"id": response[i]._id,
						"mark": response[i].currentState.mark,
						"title": response[i].currentState.title,
						"author": author,
						"assignedFor": assignedFor,
						"status":response[i].currentState.status,
						"priority": response[i].currentState.priority,
						"updatedAt": "23-04-2016",
					}
					tasks.push(task);
				}
				$scope.allTasks = tasks;
				$scope.listOfTasks = tasks;
			});
			*/
		}
		
		$scope.lookUpTask = function(id){
			if($stateParams.projectId != undefined)
				$state.go('dashBoard.task', { 'projectId': $stateParams.projectId,'id':id});
			else
				$state.go('dashBoard.userTask', { 'userId': $stateParams.userId,'id':id});

		};
		
		$scope.initCheckboxs = function() 
		{
			$scope.cToDo = true;
			$scope.cInProgress = true;
			$scope.cVerify = true;
			$scope.cDone = true;
			$scope.cNoStatus = true;

			$scope.cBlocker = true;
			$scope.cCritical = true;
			$scope.cMajor = true;
			$scope.cMinor = true;
			$scope.cTrivial = true;
			$scope.cNoPriority = true;
		}

		$scope.doFilter = function(model) {
			var newList = [];
			var allTasks = $scope.allTasks;

			for(var i = 0; i < allTasks.length; i++) {
				var ok = 0;

				if(allTasks[i].assignedFor == undefined) {
					allTasks[i].assignedFor = '--';
				}

				if(allTasks[i].status == 'To Do' && $scope.cToDo == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'In Progress' && $scope.cInProgress == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'Verify' && $scope.cVerify == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'Done' && $scope.cDone == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Blocker' && $scope.cBlocker == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Critical' && $scope.cCritical == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Major' && $scope.cMajor == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Minor' && $scope.cMinor == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Trivial' && $scope.cTrivial == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'No Status' && $scope.cNoStatus == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'No Priority' && $scope.cNoPriority == true || allTasks[i].assignedFor == '--') {
					ok = ok + 1;
				}
				if(ok > 1) {
					newList.push(allTasks[i]);
				}
			}
			
			$scope.listOfTasks = newList ;
		}

		$scope.pregled = function(id) 
		{
		//	$location.path('/dashBoard/task/'+id);
			$state.go('dashBoard.task',{taskId:id});
			document.body.style.cursor = "auto";
		}

		
		$scope.showAddTaskForm = function()
		{
			//$location.path('/dashBoard/addTask');
			if(!$stateParams.projectId)
			$state.go('dashBoard.addTask');
			else $state.go('dashBoard.addTask',{projectId:$stateParams.projectId});
		}
		$scope.showAddUserTaskForm = function()
		{
			//$location.path('/dashBoard/addTask');
			if(!$stateParams.projectId)
				$state.go('dashBoard.addUserTask',{userId:$stateParams.userId});
			else $state.go('dashBoard.addTask',{projectId:$stateParams.projectId});
		}
		$scope.selectedIndex = -1;
		$scope.tleave = function(index) {
			$scope.selectedIndex = -1;
        	document.body.style.cursor = "auto";
		}

		$scope.tover = function(index) {
        	$scope.selectedIndex = index;
        	document.body.style.cursor = "hand";
		}

		$scope.list();
		$scope.initCheckboxs();

        
}]);

angular.module('tasks').controller('taskModel', ['$scope', '$rootScope', '$location','$stateParams', 'Tasks','$state','Authentication',
	function($scope,$rootScope,$location,$stateParams,Tasks,$state,Authentication) {
		
		if(Authentication.user.role=='admin')
			$scope.isAdmin=true;
		else $scope.isAdmin = false;

		$scope.list = function() {
			console.log($stateParams.id);
			Tasks.get({taskId: $stateParams.id},function(response) {
				if(response.currentState.assignedFor!=undefined)
				var assignedFor = response.currentState.assignedFor.firstName + " " + response.currentState.assignedFor.lastName;
				else assignedFor="";

				var date = new Date(response.currentState.createdAt);
				var createdAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString()
					+ "  " + date.getHours().toString() + ":" + date.getMinutes().toString();
				if(response.currentState.updatedAt != undefined) {
					var date = new Date(response.currentState.updatedAt);
					var updatedAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString()
						+ "  " + date.getHours().toString() + ":" + date.getMinutes().toString();
					$scope.lastUpdate = true;
				} else {
					$scope.lastUpdate = false;
				}

				var task = {};
				task.id = response._id;
				task.mark = response.currentState.mark;
				task.title = response.currentState.title;
				task.name = response.currentState.author.firstName;
				task.surname = response.currentState.author.lastName;
				task.createdAt = createdAt;
				task.updatedAt = updatedAt;
				task.status = response.currentState.status;
				task.priority = response.currentState.priority;
				task.assignedFor = assignedFor;
				task.description = response.currentState.description;
				task.author = response.currentState.author.fullName;
				$scope.task = task;
		});

	}
	$scope.list();

	$scope.showHistory = function(id) {
		//$location.path('/dashBoard/task_history/'+id);
		$state.go('dashBoard.history',{taskId:id});

	}

	$scope.editTask = function(id){
		//$location.path('/dashBoard/edit_task/'+id);
		console.log(id);
		console.log($scope.task);
		if($stateParams.projectId != undefined)
			$state.go('dashBoard.editTask',{'projectId':$stateParams.projectId, 'id':id});
		else
			$state.go('dashBoard.editUserTask',{'userId':$stateParams.userId, 'id':id});

	}

	$scope.deleteTask = function(id){
		
		var task = Tasks.get({id:id},function(response){})
		task.$delete({taskId:id},function(response){console.log("USPESNO BRISANJE");
		if($stateParams.projectId != undefined)
			$state.go('dashBoard.tasksForProject', {'projectId':$stateParams.projectId});
		else	
			$state.go('dashBoard.userTasks', {'userId':$stateParams.userId});
	})
	}

}]);

angular.module('tasks').controller('addTaskCtrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Authentication',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Authentication) {
		


var loadEntries = function () {
			$scope.task = new Tasks();
			$scope.task.currentState={};
			$scope.task.currentState.priority="No Priority";
			$scope.task.currentState.status="No Status";
			$scope.task.currentState.title="";
			$scope.task.currentState.description="";
			$scope.task.currentState.project={};
			$scope.task.currentState.assignedFor={};

			$scope.projects = [];
			$scope.project = new Projects();
			//$scope.projects = Projects.query();	
			if(!$stateParams.projectId){
				
			var prjs = Projects.query(

				function(response) {
					console.log('duzina prjs je: '+prjs.length)
					
					var listClone = [];
					

					for(var i = 0; i <response.length; i++){
						for(var j = 0; j < response[i].teamMembers.length; j++){
							if(Authentication.user._id ==  response[i].teamMembers[j]._id){
								listClone.push(response[i]);
								break;
							}
						}	
					}
	
					if(listClone.length > 0){
						response= [];
						response	= listClone;		
						$scope.projects = listClone;
					}
					
					if(response.length>0){
					$scope.teamMembers = response[0].teamMembers;
					$scope.task.currentState.project._id = response[0]._id;
					if(response[0].teamMembers.length>0){
					$scope.task.currentState.assignedFor._id=response[0].teamMembers[0]._id;
					}
				}
				
    			/*for(var i=0; i<prjs.length;i++)
    			{
    				
    				for(var j=0; j<prjs[i].teamMembers.length; j++){
    					var idKor = prjs[i].teamMembers[j]._id;
    					$http.get("./api/sendMe").success(function(user){
    						
			    			console.log(user.username)
			    			$scope.user=user;
			    			
			    			if(idKor===user._id){
								console.log("KORISNIK pronadjen") ;   						
    					}
    						} );
    				}
    				*/
    			}
    		);
    		$scope.projects=prjs;
			}
			else {
				Projects.get({projectId:$stateParams.projectId},function(response){
					$scope.projects.push(response);
					$scope.task.currentState.project._id = response._id;
					$scope.teamMembers = response.teamMembers;
					if(response.teamMembers.length>0){
					$scope.task.currentState.assignedFor._id=response.teamMembers[0]._id;
					}
				})
			}
    		
    		
		}


var loadForEdit = function () {
			
			//$scope.projects = Projects.query();	
			$scope.project = new Projects();
			$scope.projects = [];
    		
    		var task = Tasks.get({taskId:$stateParams.id},function(response){

			$scope.task = new Tasks();
			$scope.task._id = task._id;
			$scope.task.currentState={};
			$scope.task.currentState.project={};
			$scope.task.currentState.assignedFor={};
			$scope.task.currentState.author = task.currentState.author;
			$scope.task.currentState.priority=task.currentState.priority;
			$scope.task.currentState.status=task.currentState.status;
			$scope.task.currentState.title=task.currentState.title;
			$scope.task.currentState.description=task.currentState.description;
			$scope.task.currentState.project._id=task.currentState.project;
			$scope.task.currentState.mark = task.currentState.mark;
			$scope.task.currentState.createdAt = task.currentState.createdAt;

			var prj = Projects.get({projectId:task.currentState.project},function(response) {
				$scope.teamMembers = response.teamMembers;
				$scope.projects.push(response);
			});
			if(task.currentState.assignedFor!=undefined)
			$scope.task.currentState.assignedFor._id=task.currentState.assignedFor._id;
			else $scope.task.currentState.assignedFor._id = "none";
				
				$scope.error = "";
			});
    		
    		
		}

if($stateParams.id===undefined){
loadEntries();
}
else{
	loadForEdit();
}



$scope.addTask = function(){
	console.log($scope.task.currentState.description);
	console.log($scope.task.currentState.title);
	console.log($scope.task.currentState.status);
	console.log($scope.task.currentState.priority);
	console.log($scope.task.currentState.project);
	console.log($scope.task.currentState.assignedFor);
	console.log($scope.task.currentState.createdAt);

/*
var task = new Tasks({
	currentState:{
        description: this.task.currentState.description,
        title: this.task.currentState.title,
        status: this.task.currentState.status,
        priority: this.task.currentState.priority,
        project: this.task.currentState.project,
        assignedFor: this.task.currentState.assignedFor
    }
      })
      
      task.$save();
      */
    if($scope.task.currentState.assignedFor._id=="none")
    	delete $scope.task.currentState.assignedFor;
    if($stateParams.id===undefined){
		$scope.task.$save(function(response){
			//$location.path('/dashBoard/task/'+$scope.task._id);
			if($stateParams.projectId != undefined)
				$state.go('dashBoard.task',{'projectId':$stateParams.projectId, 'id':$scope.task._id});
			else
				$state.go('dashBoard.userTask',{'userId':$stateParams.userId, 'id':$scope.task._id});
		}, function(errorResponse){
				$scope.error = errorResponse.data.message;
		});
	}
	
	else{
		$scope.task.$update({taskId:$scope.task._id},function(response){
			//$location.path('/dashBoard/task/'+$scope.task._id);
			if($stateParams.projectId != undefined)
				$state.go('dashBoard.task',{'projectId':$stateParams.projectId, 'id':$scope.task._id});
			else
				$state.go('dashBoard.userTask',{'userId':$stateParams.userId, 'id':$scope.task._id});
		}, function(errorResponse){
				$scope.error = errorResponse.data.message;
		})
	}

}

$scope.showUsers = function(){
	console.log($scope.task.currentState.project);
	var prj = Projects.get({projectId:$scope.task.currentState.project._id},function(response) {
		$scope.teamMembers = prj.teamMembers;
		if(prj.teamMembers.length>0){
		$scope.task.currentState.assignedFor._id = prj.teamMembers[0]._id;
		}
		console.log(prj.teamMembers.length)
	});

}



        
}]);

angular.module('tasks').controller('showHistory', ['$scope', '$rootScope', '$location','Projects','$stateParams','Tasks',
    function($scope,$rootScope,$location,Projects,$stateParams,Tasks) {

    	Tasks.get({taskId: $stateParams.taskId},function(response) {

    		var histories = [];
    		for(var i = 0; i < response.history.length; i++) {
				var assignedFor = response.history[i].assignedFor.firstName + " " + response.history[i].assignedFor.lastName;
				var date = new Date(response.history[i].createdAt);
				var createdAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
				if(response.history[i].updatedAt != undefined) {
					var date = new Date(response.history[i].updatedAt);
					var updatedAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString() 
						+ " " + date.getHours() + ":" + date.getMinutes();
					$scope.lastUpdate = true;
				} else {
					$scope.lastUpdate = false;
				}

				var task = {};
				task.id = response._id;
				task.mark = response.history[i].mark;
				task.title = response.history[i].title;
				task.name = response.history[i].firstName;
				task.surname = response.history[i].lastName;
				task.createdAt = createdAt;
				task.updatedAt = updatedAt;
				task.status = response.history[i].status;
				task.priority = response.history[i].priority;
				task.assignedFor = assignedFor;
				task.description = response.history[i].description;

				histories.push(task);
    		}
    		task = {};
    		task.title = response.currentState.title;
    		task.mark = response.currentState.mark;
    		task.author = response.currentState.author.firstName + " " + response.currentState.author.lastName 
    		+ " (  "+ response.currentState.author.username + " )"; 
    		$scope.task = task;
    		$scope.histories = histories;

    	});


}]);