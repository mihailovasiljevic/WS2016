angular.module('tasks').factory('Tasks', ['$resource',
	function($resource){


		return $resource('/api/tasks/:taskId', {
		    taskId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);