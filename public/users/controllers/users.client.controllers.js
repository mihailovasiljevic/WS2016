angular.module('users')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'Authentication', 
    function($scope,$rootScope, Authentication){
        
      var vm = this;

      // This object will be filled by the form
      vm.user = {};
      $scope.auth = true;
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

      // Register the login() function
      vm.login = function() {
        Authentication.login(this.user);
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
    
  }]);
   