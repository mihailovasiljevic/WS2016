angular.module('main').controller('listOfTasksCtrl', ['$scope', '$rootScope', '$location',
    function($scope,$rootScope,$location) {
		var list = [
		{
			"id": "u32h4jjhj3245",
			"mark": "xws1",
			"title": "zadatak broj 1",
			"description": "opisujemo",
			"author": "Nemanja Starcev",
			"assignedFor": "Milos Savic",
			"status":"To Do",
			"priority": "Major",
			"updatedAt": "23-04-2016",
		},
		{
			"id": "joij34jk3232",
			"mark": "xws2",
			"title": "zadatak broj 2",
			"description": "opisujemo",
			"author": "Nemanja Starcev",
			"assignedFor": "Rale Ilic",
			"status":"To Do",
			"priority": "Major",
			"updatedAt": "23-02-2016",
		}
		]

		$scope.listOfTasks = list;
		$scope.allTasks = list;

		$scope.cToDo = true;
		$scope.cInProgress = true;
		$scope.cVerify = true;
		$scope.cDone = true;

		$scope.cBlocker = true;
		$scope.cCritical = true;
		$scope.cMajor = true;
		$scope.cMinor = true;
		$scope.cTrivial = true;

		var doFilter = function(model) {
			var newList = [];
			var allTasks = $scope.allTasks;
			var ok = 0;
			for(var i = 0; i < allTasks.length; i++) {
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
				if(ok > 0) {
					newList.push(allTasks[i]);
				}
			}
			alert(newList.length);
			$scope.listOfTasks = newList ;
		}
		$scope.doFilter = doFilter;

		var pregled = function(id) {
			alert('usao');
			$location.path('/task/'+id);

		};
		$scope.pregled = pregled;

        
}]);
   
