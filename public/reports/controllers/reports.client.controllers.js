angular.module('reports').controller('listProjectsCtrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state) {

    	$scope.projects = Projects.query(function(response){


    	});

    	$scope.projectReport = function(id){
    		$state.go('dashBoard.chooseReport',{projectId:id});
    	}

    	$scope.goReport1 = function(){
    		$state.go('dashBoard.report1',{projectId:$stateParams.projectId})
    	}

    		$scope.goReport2 = function(){
    		$state.go('dashBoard.report2',{projectId:$stateParams.projectId})
    	}

    		$scope.goReport3 = function(){
    		$state.go('dashBoard.report3',{projectId:$stateParams.projectId})
    	}

    		$scope.goReport4 = function(){
    		$state.go('dashBoard.report4',{projectId:$stateParams.projectId})
    	}


}]);

angular.module('reports').controller('report3Ctrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Report3',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Report3) {
			$scope.days=[];
    		var res=Report3.get({report3Id:$stateParams.projectId}, function(response){
    			var max=0;
				for (var key in res) {
					
					//looping through js object, not very good
					  if (res.hasOwnProperty(key) && key.charAt(0)!='$'){
					  	if(res[key]>max)
					  		max=res[key];
					  	day = {
						x: key,
						percentage: res[key]
					}
					$scope.days.push(day);
					}
				}

				for(var i=0; i<$scope.days.length; i++ )
				{
					$scope.days[i].title = $scope.days[i].percentage;
					$scope.days[i].percentage = $scope.days[i].percentage/max*100;
				}

				
				
				
				for(var j=$scope.days.length-1; j>=0; j--){
					var max=0;
					var ind=-1;
					for(var i=0; i<j+1; i++)
					{
						var split = $scope.days[i].x.split("/");
						var value = parseInt(split[0])*1000+parseInt(split[1])*50+parseInt(split[2]);
						
						if(value>max){
							max=value;
							ind=i;		
						}
					}
					var temp = $scope.days[j];
					$scope.days[j]=$scope.days[ind]
					$scope.days[ind]=temp;
				
				}
				
    		})


    }]);


angular.module('reports').controller('report4Ctrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Report4',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Report4) {
			$scope.days=[];
    		var res=Report4.get({report4Id:$stateParams.projectId}, function(response){
    			var max=0;
				for (var key in res) {
					
					//looping through js object, not very good
					  if (res.hasOwnProperty(key) && key.charAt(0)!='$'){
					  	if(res[key]>max)
					  		max=res[key];
					  	day = {
						x: key,
						percentage: res[key]
					}
					$scope.days.push(day);
					}
				}

				for(var i=0; i<$scope.days.length; i++ )
				{
					$scope.days[i].title = $scope.days[i].percentage;
					$scope.days[i].percentage = $scope.days[i].percentage/max*100;
				}

				
				for(var j=$scope.days.length-1; j>=0; j--){
					var max=0;
					var ind=-1;
					for(var i=0; i<j+1; i++)
					{
						var split = $scope.days[i].x.split("/");
						var value = parseInt(split[0])*1000+parseInt(split[1])*50+parseInt(split[2]);
						
						if(value>max){
							max=value;
							ind=i;		
						}
					}
					var temp = $scope.days[j];
					$scope.days[j]=$scope.days[ind]
					$scope.days[ind]=temp;
				
				}
    		})


    }]);