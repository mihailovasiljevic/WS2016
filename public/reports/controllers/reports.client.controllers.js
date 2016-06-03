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

angular.module('reports').controller('reportCtrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Report3','Authentication','Report4',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Report3,Authentication,Report4) {
    		if($state.current.name.includes("report3"))
    		{
    			$scope.days=[];
				$scope.project = Projects.get({projectId:$stateParams.projectId});
				$scope.user = Authentication.user;
	    		var res=Report3.get({report3Id:$stateParams.projectId}, function(response){
    				loadReport();
    			})
    		}

    		if($state.current.name.includes("report4"))
    		{
				$scope.days=[];
				$scope.project = Projects.get({projectId:$stateParams.projectId});
				$scope.user = Authentication.user;
	    		var res=Report4.get({report4Id:$stateParams.projectId}, function(response){
    				loadReport();
    			})
    		}
			
			function loadReport(){
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
					

				var min=$scope.days[0];
				var max=$scope.days[$scope.days.length-1];
				var date = min.x;
				var control = 0;
				var i=1;
				while(date!=max.x){
					//infinite loop protection
					control++;
					if(control>3000)
						break;

					var split = date.split("/");
					
					if(parseInt(split[2])==28 && parseInt(split[1])==2)
						{
							split[1]="3";
							split[2]="1";
						}
					else if(parseInt(split[2])==30 && (parseInt(split[1])==4 || parseInt(split[1])==6 || parseInt(split[1])==9 || parseInt(split[1])==11))
					{
						split[1]=(parseInt(split[1])+1).toString();
						split[2]="1";
					}

					else if(parseInt(split[2])==31)
					{
						if(parseInt(split[1])==12){
							split[1]="1";
							split[0]=(parseInt(split[0])+1).toString();
						}
						else split[1]=(parseInt(split[1])+1).toString();
						split[2]="1";
					}
					else 
					{
						
						
						split[2]=(parseInt(split[2])+1).toString();
						
					}
					date=split[0]+"/"+split[1]+"/"+split[2];
					var element = {
						x: date,
						percentage:0,
						title:0 

					}
					if(date!=$scope.days[i].x)
					$scope.days.push(element);
					else i++;
					

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
				
    		}
    }]);
