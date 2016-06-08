angular.module('comments').factory('Comments', ['$resource',
	function($resource){
	
		return $resource('/api/comments/:commentId', {
		    commentId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);