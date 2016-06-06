angular.module('comments').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('dashBoard.changeComment', {
        url: '/comments/:commentId',
        templateUrl: 'comments/views/changeComment.html'
      })  
  }
]);