var users = projects = require('../../app/controllers/users.server.controller'),
    tasks = require('../../app/controllers/tasks.server.controller');
//TODO: implement hasAuthorization function in taskSchema!
module.exports = function(app){

    app.route('/api/tasks')
    .post(tasks.create)
    .get(tasks.list);
    app.route('/api/tasks/:taskId')
      .get(tasks.read)
      .put(tasks.update)
      .delete(tasks.delete);
    app.param('taskId', tasks.taskByID);
}
