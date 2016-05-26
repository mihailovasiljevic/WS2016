angular.module('tasks').factory('Tasks', ['$resource',
	function($resource){


			return $resource('/api/tasks/:taskId', {
			    taskId : '@_id'
			  }, {
			    update : {
			      method: 'PUT'
			    }
			  });



			/*return $resource('/api/users/:userId', {
			            userId: '@_id'
			        }, {
			            update: {
			                method: 'PUT'
			            }
			        });*/
		  /*var b = entry.query();
		  alert(entry);*/
		/*var polje = 9;
  		$http.get("/api/tasks").success(function(response) {
        	//$scope.myWelcome = response.data;
        	var i = 7;
        	polje = i;
        	alert(response[0].title);
        	alert(this.length);
    	});*/


  		/*function Tasks() {
  			$http.get("/api/tasks").success(this.onIdentity.bind(this));
  		}

  		Tasks.prototype.onIdentity = function(response) {
  			this.title = response.title;
  		};*/
	 // var Tasks = "hah";
	 // return Tasks;
}]);