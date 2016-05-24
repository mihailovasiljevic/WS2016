angular.module('projects').factory('Projects', ['$resource',
function($resource){
  return $resource('/api/projects/', {
    projectId : '@_id'
  }, {
    update : {
      method: 'PUT'
    }
  });
}]);