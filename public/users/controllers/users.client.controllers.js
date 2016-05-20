angular.module('users').controller('LoginCtrl', ['$scope', '$rootScope', 'User', 
    function($scope,$rootScope, User){
        
      var vm = this;

      // This object will be filled by the form
      vm.user = {};
      $scope.auth = true;
      if(angular.equals({}, User.user)){
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
        vm.loginError = User.loginError;
      });

      // Register the login() function
      vm.login = function() {
        User.login(this.user);
      };
        
}]);
   