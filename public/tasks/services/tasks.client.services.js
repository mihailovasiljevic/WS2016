angular.module('tasks').factory('Tasks', ['$resource',

function($resource){
  return $resource('/api/tasks/', {
    projectId : '@_id'
  }, {
    update : {
      method: 'PUT'
    }
  });
}]);