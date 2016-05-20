(function(angular) {


	var myController = function ($scope, $location) {
		

		var treeElements = [];
		treeElements.push('Projects');
		treeElements.push('Tasks');

		$scope.treeElements = treeElements;

		$scope.selectedIndex = -1;
		$scope.nodeSelected = -1;
		var selectedNode = -1;
		$scope.nodeLeave = function(index) {
			if(selectedNode != index) {
				$scope.selectedIndex = -1;
			}	
			document.body.style.cursor = "auto";
		};
		$scope.nodeOver = function(index) {
			$scope.selectedIndex = index;
			document.body.style.cursor = "hand";
		};
		$scope.nodeClick = function(index,path) {
			selectedNode = index;
			$scope.nodeSelected = index;
			var path = path.toLowerCase();
			$location.path('/'+path);
		};
	};

	var eController = function($scope) {
		
		var el = [];
		el.push('a1');
		el.push('a2');
		$scope.elements = el;
		var probam = function(clan) {
			alert(clan);
		}
		$scope.hej = probam;

		var treeElements = [];
		treeElements.push('Projects');
		treeElements.push('Tasks');
		$scope.treeElements = treeElements;
	}


	application = angular.module("app", ['ui.router','ngResource']);
    application.controller("myCtrl", myController);
    application.controller("eCtrl", eController);
    
	application.config(function($stateProvider, $urlRouterProvider) {
	    //$urlRouterProvider.otherwise('/main');
	    $stateProvider
	    /*.state('main', {//naziv stanja!
	      url: '/main',
	      templateUrl: 'primer04-entries.html',
	      controller: 'blogEntriesCtrl'
	    })*/
	    .state('listTasks', {
	      url: '/tasks', //url je #/main/search
	      templateUrl: 'listOfTasks.html'
	    })
	    /* .state('entry', {
	      url: '/blogEntries/:id',
	      templateUrl: 'primer04-entry.html',
	      controller: 'blogEntryCtrl'
	    });*/
 	});

})(angular);