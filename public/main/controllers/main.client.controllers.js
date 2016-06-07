angular.module('main').controller('myCtrl', ['$scope', '$rootScope', '$location','Authentication','$timeout','$window','$state',
    function($scope,$rootScope,$location, Authentication, $timeout, $window,$state){
        
      $scope.authentication = Authentication;
      

      if(!$scope.authentication.loggedin){
         $timeout(function(){
            $location.path('/login');
         });
      }
      
      
      var treeElements = [];
      treeElements.push('Projects');
      treeElements.push('Tasks');
      if($scope.authentication.user.role === 'admin')
        treeElements.push('Users');
      
      $scope.treeElements = treeElements;
      
      $scope.selectedIndex = -1;
      $scope.nodeSelected = -1;
      var selectedNode = -1;
      $scope.nodeLeave = function(index) {
        if(selectedNode != index) {
          $scope.selectedIndex = -1;
        } 
        document.body.style.cursor = "auto";
      };
      $scope.nodeOver = function(index) {
        $scope.selectedIndex = index;
        document.body.style.cursor = "hand";
      };
      $scope.nodeClick = function(index,path) {
        selectedNode = index;
        $scope.nodeSelected = index;
        var path = path.toLowerCase();
        $location.path('/'+path);
      };
      
      $scope.showUserTasks = function(){
        $state.go('dashBoard.userTasks', { 'userId': $scope.authentication.user._id});
      }
      
      $scope.showReports = function(){
        $state.go('dashBoard.chooseReport', { 'projectId': '5754729cbfdbf0fc2d618125'});
      }
            
      
      $scope.logout = function(){
        $scope.authentication.logout(function(data){
          if(data == true){
           $timeout(function(){
            $window.location.reload();
           });          
          }
        });
      }
}]);
   