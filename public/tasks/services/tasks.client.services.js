angular.module('tasks').factory('Tasks', ['$http',
	function($http){

		/*var polje = 9;
  		$http.get("/api/tasks").success(function(response) {
        	//$scope.myWelcome = response.data;
        	var i = 7;
        	polje = i;
        	alert(response[0].title);
        	alert(this.length);
    	});*/


  		function Tasks() {
  			$http.get("/api/tasks").success(this.onIdentity.bind(this));
  		}

  		Tasks.prototype.onIdentity = function(response) {
  			this.title = response.title;
  		};
	  var Tasks = new Tasks();
	  return Tasks;
}]);