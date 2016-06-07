angular.module('comments').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('dashBoard.changeComment', {
        url: 'tasksForProject/:projectId/tasks/:taskId/comments/:commentId',
        templateUrl: 'comments/views/changeComment.html'
      })  
      .state('dashBoard.changeUserTaskComment', {
        url: 'userId/:userId/tasks/:taskId/comments/:commentId',
        templateUrl: 'comments/views/changeComment.html'
      }) ;
  }
]);