angular.module('users').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'users/views/login.html',
      });
  }
]);