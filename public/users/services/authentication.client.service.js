angular.module('users').factory('User', ['$rootScope', '$http', '$location', '$cookies', '$q', '$timeout', '$cookieStore','$log',
  function($rootScope, $http, $location, $cookies, $q, $timeout, $cookieStore,$log){
    var self;
    
    function escape(html) {
      return String(html)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function b64_to_utf8( str ) {
      return decodeURIComponent(escape(window.atob( str )));
    }
       
    function UserClass(){
      this.name = 'users';
      this.user = {};
      this.loggedin = false;
      this.isAdmin = false;
      this.loginError = 0;
      this.usernameError = null;
      $http.get('/api/users/me').success(this.onIdentity.bind(this));
      self = this;   
    }
    
    UserClass.prototype.onIdentity = function(response){
      this.loginError = 0;
      this.loggedin = true;
      
      if(!response){
        this.user = {};
        this.loggedin = false;
        this.isAdmin = false;
      } else {
        this.user = response;
        var destination = $cookies.redirect;
        if (this.user.role === 'admin') this.isAdmin = true;
        $rootScope.$emit('loggedin');
        if (destination) {
          $location.path(destination.replace(/^"|"$/g, ''));
          $cookieStore.remove('redirect');
        } else {
          $location.url('/');
        }

        this.user = response;
        this.loggedin = true;
      }
    };
    
    UserClass.prototype.onIdFail = function(response){
      $location.path(response.redirect);
      this.loginError = 'Authentication failed.';
      $rootScope.$emit('loginfailed');
    }
    
    var User = new UserClass();
    
    UserClass.prototype.login = function(user){
      var destination = $location.path().indexOf('/login') === -1 ? $location.absUrl() : false;
      $http.post('/api/login', {
        username: user.username,
        password: user.password,
        redirect: destination
      })
      .success(this.onIdentity.bind(this))
      .error(this.onIdFail.bind(this));
    };
    
    UserClass.prototype.logout = function(){
      this.user = {};
      this.loggedin = false;
      this.isAdmin = false;
      
      $http.get('/api/logout').success(function(data){
        $rootScope.$emit('logout');
      });
    };
    
    UserClass.prototype.checkLoggedin = function(){
      var deferred = $q.defer();
      
      $http.get('/api/loggedin').success(function(user){
        if(user !== '0') $timeout(deferred.resolve);
        
        else {
          $cookieStore.put('redirect', $location.path());
          $timeout(deferred.reject);
          $location.url('/auth/login');
        }
      });
      return deferred.promise;
    }
   
    
    UserClass.prototype.checkLoggedOut = function(){
      var deferred = $q.defer();
      
      $http.get('/api/loggedin').success(function(user){
        if(user !== '0'){
          $log.log("WRF");
          $timeout(deferred.reject);
          $location.url('/');
        }   
        else $timeout(deferred.resolve);
          $log.log("WdsadaRF");  
      });
      
      return deferred.promise;
    }
    
    UserClass.prototype.checkAdmin = function(){
      var deferred = $q.defer();
      
      $http.get('/api/loggedin').success(function(user){
        if(user !== '0' && user.role !== 'admin')$timeout(deferred.resolve);
        
        else {
          $timeout(deferred.reject);
          $location.url('/');
        }
      });
      return deferred.promise;
    }
    
    console.log(User);
    return User;
  }
]);
