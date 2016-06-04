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

			console.log('jeeeeeeeeej');

			if(!$scope.listProject._id){
				console.log('1');
				$scope.listProject.$save(loadEntries);
				$state.go('dashBoard.projects');
			}
			else{
				console.log('2');
				$scope.listProject.$update(loadEntries);
				$state.go('dashBoard.projects');		
					console.log('3');		
			}
		

			
		} 
		$scope.delete = function (listProject) {
			listProject.$delete(loadEntries);
	//		listProject1.$delete(loadEntries);
		}

		

		$scope.addMember = function(id){

			$state.go('dashBoard.addMember',{projectId:id});
		}

		$scope.deleteMember = function(index){
		
				$scope.listProject.teamMembers.splice(index, 1);
				$scope.listProject.$update(loadEntries);

				$state.go('dashBoard.teamMembers', {}, {reload: true});
				
		
		}

		$scope.edit = function (listProject) {
			$scope.listProject = listProject;
	//		$scope.listProject1 = listProject;
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

		$scope.showAddProjectForm = function()
		{
			$state.go('dashBoard.addProject');

		}


		var loadForEdit = function () {
			
			$scope.project = new Projects();
			
    		
    		var listProject = Projects.get({projectId:$stateParams.projectId},function(response){


			$scope.listProject = new Projects();
			$scope.listProject._id = listProject._id;
			$scope.listProject.teamMembers={};
			

			$scope.listProject.title=listProject.title;
			$scope.listProject.teamMembers=listProject.teamMembers;


			});



			var users = Users.query(

						function(response) {
							console.log('duzina users je: '+users.length)
							if(users.length>0){
							$scope.user._id = users[0]._id;

						}
		    			
		    		}
		    		);
		    		$scope.users14=users;
		    		console.log('aaaa'+$scope.users14.length);



				//    var korisnici = Projects.get({projectId:project},function(response) {
				var korisnici = Projects.get({projectId:$stateParams.projectId},function(response) {
							$scope.teamMembers = korisnici.teamMembers;

							$scope.listProject1 = new Projects();
					$scope.listProject1._id = listProject._id;
					$scope.listProject1.teamMembers={};
			
					$scope.listProject1.title=listProject.title;




					for(var i=0;i<$scope.users14.length;i++){
							for(var j=0;j<$scope.teamMembers.length;j++){
							var name=$scope.users14[i]._id;
							var name1=$scope.teamMembers[j]._id;
								if(name1==name){
								
								console.log(name);
								$scope.users14.splice(i,1);
								console.log($scope.users14.length);
								}
							}
						} 

						$scope.listProject1.teamMembers=[];
			

						for(var i=0;i<$scope.users14.length;i++){
							$scope.listProject1.teamMembers.push($scope.users14[i]);

						}
							

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

		

		$scope.showUsers = function(id)
		{
			$state.go('dashBoard.teamMembers',{projectId:id});

		}

		$scope.listTasks = function(id)
		{
			$state.go('dashBoard.tasksForProject',{projectId:id});
		}

		
        
}]);

 