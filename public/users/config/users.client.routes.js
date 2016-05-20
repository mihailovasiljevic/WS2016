
//Setting up route
angular.module('users').config(['$routeProvider','$httpProvider','jwtInterceptorProvider',
  function($routeProvider,$httpProvider, jwtInterceptorProvider) {    
   
    jwtInterceptorProvider.tokenGetter = function() {
      return localStorage.getItem('JWT');
    };

    $httpProvider.interceptors.push('jwtInterceptor');
        
    $routeProvider.
    when('/login', {
      templateUrl: 'users/views/login.html'
    }).
    otherwise({
      redirectTo:'/'
    });   
    
  }
]);