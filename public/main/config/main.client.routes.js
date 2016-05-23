angular.module('main').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('other');
    $stateProvider
      .state('dashBoard', {
        url: '/dashBoard',
        templateUrl: 'main/views/dashBoard.html',
        controller: 'myCtrl',
      })
      .state('dashBoard.tasks', {
        url: '/tasks',
        templateUrl: 'tasks/views/listOfTasks.html',
        controller: 'listOfTasksCtrl'
      });
  }
]);