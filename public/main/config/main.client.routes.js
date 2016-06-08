angular.module('main').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('dashBoard', {
        url: '/',
        templateUrl: 'main/views/dashBoard.html',
        controller: 'myCtrl',
      })
     .state('dashBoard.loadProjects', {
        url: '/',
        templateUrl: 'projects/views/listOfProjects.html',
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
      .state('dashBoard.editProject', {
        url: 'projects/:projectId/edit',
        templateUrl: 'projects/views/editProject.html',
        controller: function($scope){
                    $scope.title = 'My Contacts';
                    console.log($scope.title);
                  }
      })
       .state('dashBoard.addTask', {
        url: 'tasksForProject/:projectId/addTask',
        templateUrl: 'tasks/views/addTask.html',
        controller: 'addTaskCtrl'
      }).      
       state('dashBoard.task', {
        url: 'tasksForProject/:projectId/tasks/:id',
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
          url: 'tasksForProject/:projectId/tasks/:id/edit',
          templateUrl: 'tasks/views/addTask.html'
       })
       .state('dashBoard.userTasks',{
          url: 'userId/:userId/tasks',
          templateUrl: 'tasks/views/userTasks.html'
       })
       .state('dashBoard.userTask',{
          url: 'userId/:userId/tasks/:id',
          templateUrl: 'tasks/views/taskDetails.html'
       })
       .state('dashBoard.editUserTask',{
          url: 'userId/:userId/tasks/:id/edit',
          templateUrl: 'tasks/views/addTask.html'
       })       ;
  }
]);