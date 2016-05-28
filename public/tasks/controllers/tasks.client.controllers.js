angular.module('tasks').controller('listOfTasksCtrl', ['$scope', '$rootScope', '$location','Tasks','Projects',
    function($scope,$rootScope,$location,Tasks,Projects) {
		
		$scope.list = function() {
			Tasks.query(function(response) {
				var tasks = [];
				for(var i = 0; i < response.length; i++) {
					var author = response[i].currentState.author.firstName + response[i].currentState.author.lastName;
					var assignedFor = response[i].currentState.assignedFor.firstName + response[i].currentState.assignedFor.lastName;
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
				//alert(JSON.stringify(task));
			});
		}

		$scope.list();
		
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
			$location.path('/dashBoard/task/'+id);
			document.body.style.cursor = "auto";
		}

		
		$scope.showAddTaskForm = function()
		{
			$location.path('/dashBoard/addTask');
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

angular.module('tasks').controller('taskModel', ['$scope', '$rootScope', '$location','$stateParams', 'Tasks',
	function($scope,$rootScope,$location,$stateParams,Tasks) {
		
		$scope.list = function() {

			Tasks.get({taskId: $stateParams.taskId},function(response) {

				var assignedFor = response.currentState.assignedFor.firstName + " " + response.currentState.assignedFor.lastName;

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

}]);

angular.module('tasks').controller('addTaskCtrl', ['$scope', '$rootScope', '$location','Projects',
    function($scope,$rootScope,$location,Projects) {

	$scope.loadEntries = function () {
		//$scope.projects = Projects.query();	
		$scope.project = new Projects();
		var prjs = Projects.query(function(response) {
			for(var i=0; i<prjs.length;i++)
			{
				console.log(prjs.length)
			}
		});
		$scope.projects=prjs;
	}
	$scope.loadEntries();


        
}]);
   
   
