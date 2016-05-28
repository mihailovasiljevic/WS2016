angular.module('main').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('other');
    $stateProvider
      .state('dashBoard', {
        url: '/dashBoard',
        templateUrl: 'main/views/dashBoard.html',
        /*controller: 'myCtrl',*/
      })
	  .state('dashBoard.projects', {
        url: '/projects',
        templateUrl: 'projects/views/listOfTasks.html',
        /*controller: 'listOfProjectsCtrl'*/
      })
      .state('dashBoard.tasks', {
        url: '/tasks',
        templateUrl: 'tasks/views/listOfTasks.html',
        /*controller: 'listOfTasksCtrl'*/
      })
	  .state('dashBoard.addProject', {
        url: '/addProject',
        templateUrl: 'projects/views/addProject.html',
        /*controller: 'addProjectCtrl'*/
      })
       .state('dashBoard.addTask', {
        url: '/addTask',
        templateUrl: 'tasks/views/addTask.html',
        /*controller: 'addTaskCtrl'*/
      })
       .state('dashBoard.task', {
        url: '/task/:taskId',
        templateUrl: 'tasks/views/taskDetails.html',
        /*controller: 'listOfTasksCtrl'*/
      });
  }
]);