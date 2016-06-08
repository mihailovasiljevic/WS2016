
angular.module('main').config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {    
   
   $urlRouterProvider.otherwise('/');
    $stateProvider
     .state('dashBoard.chooseReport',{
      url: 'chooseReport/:projectId',
      templateUrl: 'reports/views/projectChooseReport.html'
     })
           .state('dashBoard.report1',{
      url: 'report1/:projectId',
      templateUrl: 'reports/views/report1.html'
     })
             .state('dashBoard.report2',{
      url: 'report2/:projectId',
      templateUrl: 'reports/views/report2.html'
     })
               .state('dashBoard.report3',{
      url: 'report3/:projectId',
      templateUrl: 'reports/views/report3.html'
     })
                 .state('dashBoard.report4',{
      url: 'report4/:projectId',
      templateUrl: 'reports/views/report4.html'
     }) 
                 
       .state('dashBoard.report5',{
      url: 'report5/:projectId',
      templateUrl: 'reports/views/report5.html'
     });
  }
]);