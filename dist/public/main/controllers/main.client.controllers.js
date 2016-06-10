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
        if(document.getElementsByClassName('active')[0].text != 'Tasks'){
          var projects = document.getElementsByClassName('active')[0];
          var tasks =  document.getElementsByClassName('active')[0].parentNode.parentNode.children[1].children[0];
          tasks.setAttribute('class', 'active');
          projects.setAttribute('class', '');

          $state.go('dashBoard.userTasks', { 'userId': $scope.authentication.user._id});
        }else{
          $state.go('dashBoard.userTasks', { 'userId': $scope.authentication.user._id});
        }
      }
      
      $scope.showProjects = function(){
        if(document.getElementsByClassName('active')[0].text != 'Projects'){
          var tasks = document.getElementsByClassName('active')[0];
          var projects =  document.getElementsByClassName('active')[0].parentNode.parentNode.children[0].children[0];
          projects.setAttribute('class', 'active');
          tasks.setAttribute('class', '');

          $state.go('dashBoard.loadProjects');
        }else {
          $state.go('dashBoard.loadProjects');
        }
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
   