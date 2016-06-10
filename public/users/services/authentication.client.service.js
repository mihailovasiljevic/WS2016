angular.module('users').factory('Authentication', ['$rootScope', '$http', '$location', '$cookies', '$q', '$timeout', '$cookieStore','$log','UserLogin',
  function($rootScope, $http, $location, $cookies, $q, $timeout, $cookieStore,$log,UserLogin){
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
      this.passwordError = null;
      this.error = null;
      $http.get('/api/users/me').success(this.onIdentity.bind(this));
      self = this;   
    }
    
    UserClass.prototype.onIdentity = function(response,callback){
      this.loginError = 0;
      this.loggedin = true;
      
      if(!response){
        this.user = {};
        this.loggedin = false;
        this.isAdmin = false;
      } else {
        if(response.message == 'Success'){
          this.user = response.user;
          var destination = $cookies.redirect;
          if (this.user.role === 'admin') this.isAdmin = true;
          $rootScope.$emit('loggedin');
          if (destination) {
            $location.path(destination.replace(/^"|"$/g, ''));
            $cookieStore.remove('redirect');
          } else {
            $location.url('/');
          }
          
          this.loggedin = true;
          this.loginError = 0;
          this.usernameError = null;
          this.passwordError = null;
          $cookieStore.put("user", this.user);      
        } else if (response.message == 'Failure'){
          this.loggedin = false;
          
          this.loginError++;
          this.error = response.message.error;
          callback(error);    
        }
        else {
          
          this.loggedin = false;
          
          if(response.information.message == 'Uknown user'){
            this.usernameError = response.information.message;
            this.loginError++;
          }
          else if (response.information.message == 'Invalid password' || response.information.message == 'Authentication failed' ){
            this.loginError++;
            this.passwordError = response.information.message;
          }
          
          callback(response.information.message); 
            
        }
      }
    };
    
    UserClass.prototype.onIdFail = function(response){
      $location.path(response.redirect);
      this.loginError = 'Authentication failed.';
      $rootScope.$emit('loginfailed');
    }
    
    if($cookieStore.get("user") != undefined){
      if(Object.keys($cookieStore.get("user")).length == 0)
        var User = new UserClass();
      else{
        var User = new UserClass();
        User.onIdentity(new Object({message: 'Success', user: $cookieStore.get("user")}));
      }
    }
     else
        var User = new UserClass();
    UserClass.prototype.login = function(user, callback){
      /*
      var destination = $location.path().indexOf('/login') === -1 ? $location.absUrl() : false;
      $http.post('/api/login', {
        username: user.username,
        password: user.password,
        redirect: destination
      })
      .success(
        function(){
          this.onIdentity.bind(this);
          this.onIdentity(this, callback);
          
        }
      )
      .error(this.onIdFail.bind(this));
      return {
          usernameError: this.usernameError,
          password: this.passwordError
      }
      */

      var login = new UserLogin({
        username: user.username,
        password: user.password,
      })
      
      login.$save(function(response){
        User.onIdentity(response, callback )
      }, function(errorResponse){
        this.onIdentity(errorResponse, callback )
      });
    
    };
    
    UserClass.prototype.logout = function(callback){
      this.user = {};
      this.loggedin = false;
      this.isAdmin = false;
      $cookieStore.remove("user");
      $http.get('/api/logout').success(function(data){
        $cookieStore.remove("user");
        $rootScope.$emit('logout');
        callback(true);
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
