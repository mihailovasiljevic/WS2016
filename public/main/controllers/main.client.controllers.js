angular.module('main').controller('myCtrl', ['$scope', '$rootScope', '$location','Authentication',
    function($scope,$rootScope,$location, Authentication){
        
      $scope.authentication = Authentication;
      console.log(Authentication.user);
      console.log($scope.authentication.loggedin)    
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
        
}]);
   