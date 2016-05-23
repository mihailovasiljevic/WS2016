angular.module('main').controller('myCtrl', ['$scope', '$rootScope', '$location',
    function($scope,$rootScope,$location){
        
      var treeElements = [];
      treeElements.push('Projects');
      treeElements.push('Tasks');

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
        $location.path('/dashBoard/'+path);
      };
        
}]);
   