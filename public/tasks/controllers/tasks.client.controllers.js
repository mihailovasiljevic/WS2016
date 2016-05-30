angular.module('tasks').controller('listOfTasksCtrl', ['$scope', '$rootScope', '$location','Tasks','Projects','$state',
    function($scope,$rootScope,$location,Tasks,Projects,$state) {

		$scope.list = function() {
			Tasks.query(function(response) {
				var tasks = [];
				for(var i = 0; i < response.length; i++) {
					var author = response[i].currentState.author.firstName + response[i].currentState.author.lastName;
					if(response[i].currentState.assignedFor!=undefined)
					var assignedFor = response[i].currentState.assignedFor.firstName + response[i].currentState.assignedFor.lastName;
					else assignedFor="";
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
		}
		
		$scope.initCheckboxs = function() 
		{
			$scope.cToDo = true;
			$scope.cInProgress = true;
			$scope.cVerify = true;
			$scope.cDone = true;

			$scope.cBlocker = true;
			$scope.cCritical = true;
			$scope.cMajor = true;
			$scope.cMinor = true;
			$scope.cTrivial = true;
		}

		$scope.doFilter = function(model) {
			var newList = [];
			var allTasks = $scope.allTasks;

			for(var i = 0; i < allTasks.length; i++) {
				var ok = 0;
				if(allTasks[i].status == 'To Do' && $scope.cToDo == true) {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'In Progress' && $scope.cInProgress == true) {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'Verify' && $scope.cVerify == true) {
					ok = ok + 1;
				}
				if(allTasks[i].status == 'Done' && $scope.cDone == true) {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Blocker' && $scope.cBlocker == true) {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Critical' && $scope.cCritical == true) {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Major' && $scope.cMajor == true) {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Minor' && $scope.cMinor == true) {
					ok = ok + 1;
				}
				if(allTasks[i].priority == 'Trivial' && $scope.cTrivial == true) {
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
			$state.go('dashBoard.addTask');
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

angular.module('tasks').controller('taskModel', ['$scope', '$rootScope', '$location','$stateParams', 'Tasks','$state',
	function($scope,$rootScope,$location,$stateParams,Tasks,$state) {
		
		$scope.list = function() {

			Tasks.get({taskId: $stateParams.taskId},function(response) {
				if(response.currentState.assignedFor!=undefined)
				var assignedFor = response.currentState.assignedFor.firstName + " " + response.currentState.assignedFor.lastName;
				else assignedFor="";

				var date = new Date(response.currentState.createdAt);
				var createdAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
				if(response.currentState.updatedAt != undefined) {
					var date = new Date(response.currentState.updatedAt);
					var updatedAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
					$scope.lastUpdate = true;
				} else {
					$scope.lastUpdate = false;
				}

				var task = {};
				task.id = response._id;
				task.mark = response.currentState.mark;
				task.title = response.currentState.title;
				task.name = response.currentState.firstName;
				task.surname = response.currentState.lastName;
				task.createdAt = createdAt;
				task.updatedAt = updatedAt;
				task.status = response.currentState.status;
				task.priority = response.currentState.priority;
				task.assignedFor = assignedFor;
				task.description = response.currentState.description;

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
		$state.go('dashBoard.editTask',{taskId:id});

	}

	$scope.deleteTask = function(id){
		var task = Tasks.get({taskId:id},function(response){})
		task.$delete({taskId:id},function(response){console.log("USPESNO BRISANJE");});
		$state.go('dashBoard.tasks');
	}

}]);

angular.module('tasks').controller('addTaskCtrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state) {
		
console.log('dfddfdffdfd3344334');

var loadEntries = function () {
			$scope.task = new Tasks();
			$scope.task.currentState={};
			$scope.task.currentState.priority="No Priority";
			$scope.task.currentState.status="No Status";
			$scope.task.currentState.title="";
			$scope.task.currentState.description="";
			$scope.task.currentState.project={};
			$scope.task.currentState.assignedFor={};

			//$scope.projects = Projects.query();	
			$scope.project = new Projects();
			var prjs = Projects.query(

				function(response) {
					console.log('duzina prjs je: '+prjs.length)
					if(prjs.length>0){
					$scope.teamMembers = prjs[0].teamMembers;
					$scope.task.currentState.project._id = prjs[0]._id;
					if(prjs[0].teamMembers.length>0){
					$scope.task.currentState.assignedFor._id=prjs[0].teamMembers[0]._id;
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


var loadForEdit = function () {
			
			//$scope.projects = Projects.query();	
			$scope.project = new Projects();
			var prjs = Projects.query(

				function(response) {
					/*
					console.log('duzina prjs je: '+prjs.length)
					if(prjs.length>0){
					$scope.teamMembers = prjs[0].teamMembers;
					$scope.task.currentState.project._id = prjs[0]._id;
					if(prjs[0].teamMembers.length>0)
					$scope.task.currentState.assignedFor._id=prjs[0].teamMembers[0]._id;
				*/}
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
    			//}
    		);
    		$scope.projects=prjs;
    		
    		var task = Tasks.get({taskId:$stateParams.taskId},function(response){


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

			var prj = Projects.get({projectId:task.currentState.project},function(response) {
				$scope.teamMembers = prj.teamMembers;
			});
			if(task.currentState.assignedFor!=undefined)
			$scope.task.currentState.assignedFor._id=task.currentState.assignedFor._id;
			else $scope.task.currentState.assignedFor._id = "none";


			});
    		
    		
		}

if($stateParams.taskId===undefined){
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
    if($stateParams.taskId===undefined){
		$scope.task.$save(function(response){
			//$location.path('/dashBoard/task/'+$scope.task._id);
			$state.go('dashBoard.task',{taskId:$scope.task._id});
		});
	}
	
	else{
		$scope.task.$update({taskId:$scope.task._id},function(response){
			//$location.path('/dashBoard/task/'+$scope.task._id);
			$state.go('dashBoard.task',{taskId:$scope.task._id});
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