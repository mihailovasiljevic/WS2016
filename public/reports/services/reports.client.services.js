angular.module('reports').factory('Report3', ['$resource',
	function($resource){

		return $resource('/api/report_3/:report3Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);

angular.module('reports').factory('Report4', ['$resource',
	function($resource){

		return $resource('/api/report_4/:report4Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);

angular.module('reports').factory('Report1', ['$resource',
	function($resource){
		return $resource('/api/report_1/:report1Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });
}]);

angular.module('reports').factory('Report2', ['$resource',
	function($resource){
		return $resource('/api/report_2/:report2Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });
}]);