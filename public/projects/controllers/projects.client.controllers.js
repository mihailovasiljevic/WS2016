angular.module('projects').controller('listOfProjectsCtrl', ['$scope', '$rootScope', '$location','Projects','Users','$stateParams','$state',
    function($scope,$rootScope,$location,Projects,Users,$stateParams,$state) {
		
		$scope.listProjects={};
		var loadEntries = function () {
			$scope.listProjects = Projects.query();		
			$scope.listProject = new Projects();

			$scope.ubaci= function(member,project){


				var oznaka=false;

				var korisnici = Projects.get({projectId:project},function(response) {
					$scope.teamMembers = korisnici.teamMembers;


				$scope.listProject.teamMembers=[];

				for(var i=0;i<$scope.teamMembers.length;i++){
					$scope.listProject.teamMembers.push($scope.teamMembers[i]);

					if($scope.teamMembers[i]._id==member){
						 oznaka=true;
					}
					
				}
				
				if (oznaka==false) {
					$scope.listProject.teamMembers.push(member);
				}
				
	
				});
				
				
			}

			
		}
		loadEntries();




		$scope.save = function () {
			if(!$scope.listProject._id){

				$scope.listProject.$save(loadEntries);
				$state.go('dashBoard.projects');
			}
			else{
				$scope.listProject.$update(loadEntries);
				$state.go('dashBoard.projects');				
			}
		} 
		$scope.delete = function (listProject) {
			listProject.$delete(loadEntries);
		}

		$scope.deleteMember = function(index){
		/*var korisnici = Projects.get({projectId:project},function(response) {
					$scope.teamMembers = korisnici.teamMembers;
					console.log(idTask);
					console.log($scope.teamMembers[0]._id);

					for(var i=0;i<$scope.teamMembers.length;i++){
					
					if($scope.teamMembers[i]._id==idTask){
						console.log('hajd');
						$scope.teamMembers[i].$delete();
						 
					}
					
					}

	
				//	$scope.teamMembers[idTask].$delete({projectId:project},function(response){});
					$state.go('dashBoard.teamMembers');
				});*/
				$scope.listProject.teamMembers.splice(index, 1);
				$scope.listProject.$update(loadEntries);
				$state.go('dashBoard.teamMembers', {}, {reload: true});
				
		
		}

		$scope.edit = function (listProject) {
			$scope.listProject = listProject;
			$state.go('dashBoard.editProject');
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

		$scope.Projects = function(){
			console.log('usao14');
			console.log($scope.user);
	
			var korisnici = Projects.get({projectId:$scope.project._id},function(response) {
			$scope.teamMembers = korisnici.teamMembers;
	
			});
		}

		/*$scope.items = function(){
			console.log('usao14');
			console.log($scope.user);
	
			var korisnici = Users.get({userId:$scope.user._id},function(response) {
			$scope.teamMembers = korisnici.teamMembers;
	
			});
		}*/

		  $scope.items = [
	        { text: 'foo' },
	        { text: 'bar' },
	        { text: 'baz' }
    	];

		$scope.toggle = function (item) {
        item.selected = !item.selected;
    	};


		$scope.showAddProjectForm = function()
		{
			$state.go('dashBoard.addProject');

		}


		var loadForEdit = function () {
			
			//$scope.projects = Projects.query();	
			$scope.project = new Projects();
			
    		
    		var listProject = Projects.get({projectId:$stateParams.projectId},function(response){


			$scope.listProject = new Projects();
			$scope.listProject._id = listProject._id;
			$scope.listProject.teamMembers={};
			

			$scope.listProject.title=listProject.title;
			$scope.listProject.teamMembers=listProject.teamMembers;
			
			});
    		
    		
		}

		if($stateParams.projectId===undefined){
		loadEntries();
		}
		else{
			loadForEdit();
		}

		$scope.editProject = function(id){
		$state.go('dashBoard.editProject',{projectId:id});
		}

		$scope.addMember = function(id){
		$state.go('dashBoard.addMember',{projectId:id});
		}

		$scope.showUsers = function(id)
		{
			//$scope.listProject = listProject;
			$state.go('dashBoard.teamMembers',{projectId:id});

		}


		/*$scope.listOfTasks = Projects.query();
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
		$scope.doFilter = doFilter;*/
		
		
		console.log('Milos'+JSON.stringify($scope.listProjects));
		console.log('Milos'+JSON.stringify($scope.teamMembers));
        
}]);

 