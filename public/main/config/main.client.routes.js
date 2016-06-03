angular.module('main').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('dashBoard', {
        url: '/',
        templateUrl: 'main/views/dashBoard.html',
        /*controller: 'myCtrl',*/
      })
    .state('dashBoard.projects', {
        url: 'projects',
        templateUrl: './projects/views/listOfProjects.html',
        /*controller: 'listOfProjectsCtrl'*/
      })
      .state('dashBoard.tasks', {
        url: 'tasks',
        templateUrl: './tasks/views/listOfTasks.html',
        /*controller: 'listOfTasksCtrl'*/
      })
    .state('dashBoard.addProject', {
        url: 'addProject',
        templateUrl: 'projects/views/addProject.html',
        /*controller: 'addProjectCtrl'*/
      })
    .state('dashBoard.teamMembers', {
        url: 'teamMembers/:projectId',
        templateUrl: 'projects/views/showMembers.html'
        /*controller: 'addProjectCtrl'*/
      })
       .state('dashBoard.addTask', {
        url: 'addTask',
        templateUrl: 'tasks/views/addTask.html',
        /*controller: 'addTaskCtrl'*/
      })
       .state('dashBoard.task', {
        url: 'task/:taskId',
        templateUrl: 'tasks/views/taskDetails.html',
        /*controller: 'listOfTasksCtrl'*/
      })
       .state('dashBoard.history', {
          url: 'task_history/:taskId',
          templateUrl: 'tasks/views/taskHisotry.html',
       })
       .state('dashBoard.editTask',{
          url: 'edit_task/:taskId',
           templateUrl: 'tasks/views/addTask.html'
       })
       .state('dashBoard.editProject',{
          url: 'edit_project/:projectId',
           templateUrl: 'projects/views/editProject.html'
       })
       .state('dashBoard.addMember',{
          url: 'add_member/:projectId',
           templateUrl: 'projects/views/addMember.html'
       })
      .state('dashBoard.changeComment',{
		  url: 'edit_comment/:commentId',
		  templateUrl: 'comments/views/changeComment.html'
     });
  }
]);