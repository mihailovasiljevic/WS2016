angular.module('comments').controller('listOfComments', ['$scope', '$rootScope', '$location', '$stateParams','$state', 'Comments', 'Authentication',
    function($scope,$rootScope,$location, $stateParams,$state, Comments, Authentication) {
    	

    	$scope.hasComment = false;
    	Comments.query(function(response) {
    		var taskId = $stateParams.taskId;
    		var comments = [];
    		for(var i = 0; i < response.length; i++) {
    			if(response[i].task === taskId) {
    				if(Authentication.isAdmin == true) {
    					response[i].show = true;
    				} else {
    					var id = Authentication.user._id;
    					if(id == response[i].author._id) {
							response[i].show = true;
    					} else {
							response[i].show = false;
    					}
    				}
    				comments.push(response[i]);
    			}
    		}
    		$scope.comments = comments;
    	});
    	
    	
    	$scope.create = function() {
    		$scope.comment = new Comments();
    		$scope.comment.task = $stateParams.taskId;
    		if($scope.commentM.text == "" || $scope.commentM.text == undefined) {
    			$scope.hasComment = true;
    			return false;
    		}
    		$scope.comment.title = $scope.commentM.title;
    		$scope.comment.text = $scope.commentM.text;
    		$scope.comment.$save(function(response) {
    			$scope.commentM.title = "";
    			$scope.commentM.text = "";
    			$scope.hasComment = false;
    			response.show = true;
    			$scope.comments.push(response);
    		});
    	}

    	$scope.update = function(id) {
    		$state.go('dashBoard.changeComment',{"commentId":id});
    	}

    	$scope.delete = function(id) {
    		$scope.comment = new Comments();
    		$scope.comment.$delete({"commentId":id},function() {
    			for(var i = 0; i < $scope.comments.length; i++) {
    				if($scope.comments[i]._id == id) {
						$scope.comments.splice(i,1);
    				}
    			}
    		});
    	}


}])

.controller('changeComment', ['$scope', '$rootScope', '$location', '$stateParams','$state', 'Comments',
    function($scope,$rootScope,$location, $stateParams,$state, Comments) {
    	
    	var commentId = $stateParams.commentId;
    	Comments.get({"commentId":commentId},function(response) {
			$scope.commentM = new Comments();
			$scope.commentM._id = response._id;
    		$scope.commentM.title = response.title;
    		$scope.commentM.text = response.text;
    		$scope.commentM.task =  response.task;
    		$scope.commentM.author =  response.author;
    		$scope.commentM.createdAt =  response.createdAt;

    		$scope.taskId = response.task;
    		$scope.commentId = response._id;
    		
    	});



    	$scope.update = function() {
    		
    		$scope.commentM.$update({"commentId":$scope.commentId},function(response) {

    			$state.go('dashBoard.task',{"taskId":$scope.taskId});
    		});
    	}

}]);
