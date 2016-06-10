angular.module('comments').controller('listOfComments', ['$scope', '$rootScope', '$location', '$stateParams','$state', 'Comments', 'Authentication',
    function($scope,$rootScope,$location, $stateParams,$state, Comments, Authentication) {
    	

    	$scope.hasComment = false;
    	$scope.warning = false;
    	$scope.commentM = {};
    	$scope.commentM.title = "";
    	$scope.commentM.text = "";
    	Comments.query(function(response) {
    		var taskId = $stateParams.id;
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
					var date = new Date(response[i].createdAt);
					if(date.getHours() <= 9) {
						var hours = "0" + date.getHours().toString();
					} else {
						var hours = date.getHours().toString();
					}
					if(date.getMinutes() <= 9) {
						var minutes = "0" + date.getMinutes().toString();
					} else {
						var minutes = date.getMinutes().toString();
					}
					var createdAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString()
						+ "  " + hours + ":" + minutes;
					response[i].createdAt = createdAt;
    				comments.push(response[i]);
    			}
    		}
    		$scope.comments = comments;
    	});
    	
    	
    	$scope.create = function() {
    		$scope.comment = new Comments();
    		$scope.comment.task = $stateParams.id;
    		if($scope.commentM.text == "" || $scope.commentM.text == undefined) {
    			$scope.hasComment = true;
    			$scope.warning = true;
    			return false;
    		}
    		$scope.comment.title = $scope.commentM.title;
    		$scope.comment.text = $scope.commentM.text;
    		$scope.comment.$save(function(response) {
    			$scope.commentM.title = "";
    			$scope.commentM.text = "";
    			$scope.hasComment = false;
    			response.show = true;
    			var date = new Date(response.createdAt);
				if(date.getHours() <= 9) {
					var hours = "0" + date.getHours().toString();
				} else {
					var hours = date.getHours().toString();
				}
				if(date.getMinutes() <= 9) {
					var minutes = "0" + date.getMinutes().toString();
				} else {
					var minutes = date.getMinutes().toString();
				}
				var createdAt = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString()
					+ "  " + hours + ":" + minutes;
				response.createdAt = createdAt;
				$scope.warning = false;
    			$scope.comments.push(response);
    		}, function(errorResponse){
				$scope.comments_error = errorResponse.data.message;
			});
    	}

    	$scope.update = function(id) {
			if($stateParams.projectId != undefined)
    			$state.go('dashBoard.changeComment',{"projectId":$stateParams.projectId,"taskId":$stateParams.id,"commentId":id});
			else
				$state.go('dashBoard.changeUserTaskComment',{"userId":$stateParams.userId,"taskId":$stateParams.id,"commentId":id});
    	}

    	$scope.delete = function(id) {
    		$scope.comment = new Comments();
    		$scope.comment.$delete({"commentId":id},function() {
    			for(var i = 0; i < $scope.comments.length; i++) {
    				if($scope.comments[i]._id == id) {
						$scope.comments.splice(i,1);
    				}
    			}
    		}, function(errorResponse){
				alert("Somebody probably already deleted that.");
				console.log("Somebody probably already deleted that.");
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


		$scope.hasComment = false;
    	$scope.update = function() {
    		if($scope.commentM.text == "") {
    			$scope.hasComment = true;
    			return false;
    		}
    		$scope.commentM.$update({"commentId":$scope.commentId},function(response) {
				if($stateParams.projectId != undefined)
    				$state.go('dashBoard.task',{"projectId":$stateParams.projectId,"id":$stateParams.taskId});
				else
					$state.go('dashBoard.userTask',{"userId":$stateParams.userId,"id":$stateParams.taskId});
    		}, function(errorResponse){
				alert("Somebody probably already deleted that.");
			});
    	}

}]);
