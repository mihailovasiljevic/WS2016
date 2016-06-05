angular.module('users')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'Authentication', '$timeout',
    function($scope,$rootScope, Authentication, $timeout){
        
      var vm = this;




      // This object will be filled by the form
      vm.user = {};
      $scope.auth = true;
      
      if(Authentication.loggedin){
         $timeout(function(){
            $location.path('/login');
         });
      }
      
      if(angular.equals({}, Authentication.user)){
          $scope.auth = false;
      }

      vm.input = {
        type: 'password',
        placeholder: 'Password',
        confirmPlaceholder: 'Repeat Password',
        iconClass: '',
        tooltipText: 'Show password'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };

      $rootScope.$on('loginfailed', function(){
        vm.loginError = Authentication.loginError;
      });
      $scope.username = null;
      $scope.password = null;

      // Register the login() function
      vm.login = function() {
        this.user.username = $scope.username;
        this.user.password = $scope.password;
        
        Authentication.login(this.user)
                
        $scope.loginError = "";        
        if(loginError.usernameError != null){
           $scope.loginError+=loginError.usernameError;
        }else if(loginError.passwordError != null){
           $scope.loginError+=loginError.passwordError;
        }
      };
        
}])

  .controller('UsersController', ['$scope', '$location','$stateParams', 'Authentication', 'Users', 
  function($scope, $location,$stateParams , Authentication, Users){
    $scope.authentication = Authentication;
    
    $scope.create = function(){
      var user = new Users({
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role
      })
      
      user.$save(function(response){
        $location.path('users/'+response._id);
      }, function(errorResponse){
        $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.find = function(){
      $scope.users = Users.query();
    };
    
    $scope.findOne = function(){
      $scope.user = Users.get({
        userId: $stateParams.userId
      });
    };
    
    $scope.update = function(){
      $scope.user.$update(function(){
        $location.path('users/' + $scope.user._id);
      }, function(errorResponse){
        $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.delete = function(user){
      if(user){
        user.$remove(function(){
          for(var i in $scope.users){
            if($scope.users[i] === user){
               $scope.users.splice(i,1);
            }
          }
        });
      } else {
        $scope.user.$remove(function(){
          $location.path('users');
        });
      }
    };
    
  }])
  .controller('RegisterCtrl', ['$scope', '$rootScope', 'Authentication', '$timeout','Users',
    function($scope,$rootScope, Authentication, $timeout, Users){
        
      var vm = this;
      
      $scope.auth = true;
      
      if(Authentication.loggedin){
         $timeout(function(){
            $location.path('/login');
         });
      }
      
      if(angular.equals({}, Authentication.user)){
          $scope.auth = false;
      }

      function userObject(username, password, email, firstName, lastName, repeatPassword){
        this.username = username;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = 'user';
      }
      
      $scope.user = new userObject(null, null, null, null, null, null);

      $rootScope.$on('loginfailed', function(){
        vm.loginError = Authentication.loginError;
      });

      function validateEmail(email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }
      // Register the login() function
      function emptyFields(array){
        for(var i = 0; i < array.length; i++){
          if(array[i] != null){
            if(array[i].length === 0)
              return false;
            
          }else{
            return false;
          }
        }
        return true;
      }
      vm.register = function() {
        $scope.registerError = "";
        if($scope.user.password !== null && $scope.user.repeatPassword !==null)
          if($scope.user.password !== $scope.user.repeatPassword){
            $scope.registerError += "\nPasswords do not match.";  
          }
        var array = [];
        array.push($scope.user.username);
        array.push($scope.user.password);
        array.push($scope.user.repeatPassword);
        array.push($scope.user.firstName);
        array.push($scope.user.lastName);
        array.push($scope.user.email);
        if(!emptyFields(array)){
          $scope.registerError += "All fields must be filled.";
        }
        if($scope.user.password)
          if ($scope.user.password.length < 8){
            $scope.registerError += "\nPassword must be longer than 8 characters.";  
          }
        if($scope.user.email)
          if(!validateEmail($scope.user.email.trim())){
            $scope.registerError += "\nEmail must bi in right format. Example: something@gmail.com";  
          }
        if($scope.registerError != ""){
          alert($scope.registerError);
          return false;
        }
        
        (function(){
          var user = new Users({
            username: $scope.user.username,
            password: $scope.user.password,
            email: $scope.user.email,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            role: $scope.user.role
          })
          
          user.$save(function(response){
            this.usr = {};
            this.usr.username = $scope.user.username;
            this.usr.password = $scope.user.password;
            Authentication.login(usr);

              $timeout(function(){
                  $location.path('/');
              });
          }, function(errorResponse){
            $scope.registerError = errorResponse.data.message;
            alert($scope.registerError);
          });
        })();
      };
        
}]);
   