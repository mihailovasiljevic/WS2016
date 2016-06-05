angular.module('main').controller('myCtrl', ['$scope', '$rootScope', '$location','$state','Authentication',
    function($scope,$rootScope,$location,$state,Authentication){
        
      var treeElements = [];
      treeElements.push('Projects');
      treeElements.push('Tasks');
      if(Authentication.user.role=='admin'){
      treeElements.push("Reports");
      treeElements.push("Users");
    }

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
        $state.go('dashBoard.'+path);
       // $location.path('/dashBoard/'+path);
      };
        
}]);
   