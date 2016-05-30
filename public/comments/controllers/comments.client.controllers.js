angular.module('comments').controller('listOfComments', ['$scope', '$rootScope', '$location', 
    function($scope,$rootScope,$location) {
    	alert('usao');
}])

.controller('addComment', ['$scope', '$rootScope', '$location', '$stateParams', 'Comments',
    function($scope,$rootScope,$location,$stateParams, Comments) {
    	
    	$scope.comment = new Comments();
    	$scope.hasComment = false;
    	
    	$scope.create = function() {
    		$scope.comment.task = $stateParams.taskId;
    		if($scope.comment.text == "" || $scope.comment.text == undefined) {
    			$scope.hasComment = true;
    			return false;
    		}
    		$scope.comment.$save(function(response) {
    			$scope.comment.title = "";
    			$scope.comment.text = "";
    			$scope.hasComment = false;
    		});
    	}
}]);