angular.module('main').controller('listOfProjectsCtrl', ['$scope', '$rootScope', '$location','Projects','Users',
    function($scope,$rootScope,$location,Projects,Users) {
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

		
		var loadEntries = function () {
			$scope.listProjects = Projects.query();		
			$scope.listProject = new Projects();
		}
		loadEntries();
		$scope.save = function () {
			if(!$scope.listProject._id){
				$scope.listProject.$save(loadEntries);
				$location.path('/dashBoard/projects');
			}
			else{
				$scope.listProject.$update(loadEntries);
				$location.path('/dashBoard/projects');				
			}
		} 
		$scope.delete = function (listProject) {
			listProject.$delete(loadEntries);
		}
		$scope.edit = function (listProject) {
			$scope.listProject = listProject;
			$location.path('/dashBoard/editProject');
		} 

		$scope.showUsers = function(listProject)
		{
			$scope.listProject = listProject;
			$location.path('/dashBoard/teamMembers');

		}

		var loadEntriesUsers = function () {
			
			$scope.user = new Users();
			var users = Users.query(

				function(response) {
					console.log('duzina users je: '+users.length)
					if(users.length>0){
					$scope.user._id = users[0]._id;
					
				}
    			
    		}
    		);
    		$scope.users=users;
    		

   
		}
		loadEntriesUsers();
		

		$scope.Users = function(){
			console.log('usao14');
			console.log($scope.user);
	
			var korisnici = Users.get({userId:$scope.user._id},function(response) {
			$scope.teamMembers = korisnici.teamMembers;
	
			});
		}
		
		$scope.listOfTasks = list;
		$scope.allTasks = list;

		$scope.listOfTasks = Projects.query();
		$scope.allTasks = Projects.query();

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
			$location.path('/project/'+id);

		};
		$scope.pregled = pregled;


		
		$scope.showAddProjectForm = function()
		{
			$location.path('/dashBoard/addProject');

		}

		

		




        
}]);

