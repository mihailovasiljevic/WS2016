angular.module('main').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('dashBoard', {
        url: '/',
        templateUrl: 'main/views/dashBoard.html',
        controller: 'myCtrl',
      })
	  .state('dashBoard.projects', {
        url: '/projects',
        templateUrl: 'projects/views/listOfTasks.html',
        controller: 'listOfProjectsCtrl'
      })
      .state('dashBoard.tasks', {
        url: '/tasks',
        templateUrl: 'tasks/views/listOfTasks.html',
        controller: 'listOfTasksCtrl'
      })
	  .state('dashBoard.addProject', {
        url: 'projects/addProject',
        templateUrl: 'projects/views/addProject.html',
        controller: function($scope){
                    $scope.title = 'My Contacts';
                    console.log($scope.title);
                  }
      })
       .state('dashBoard.addTask', {
        url: '/addTask',
        templateUrl: 'tasks/views/addTask.html',
        controller: 'addTaskCtrl'
      }).      
       state('dashBoard.task', {
        url: '/tasks/:id',
        templateUrl: 'tasks/views/taskDetails.html',
        controller: 'listOfTasksCtrl'
      })       
      .state('dashBoard.tasksForProject',{
        url: 'tasksForProject/:projectId',
        templateUrl: 'tasks/views/listOfTasks.html'
      }) 
      .state('dashBoard.history', {
          url: 'tasks/history/:taskId',
          templateUrl: 'tasks/views/taskHistory.html',
       })
       .state('dashBoard.editTask',{
          url: 'tasks/:taskId',
          templateUrl: 'tasks/views/addTask.html'
       });
  }
]);