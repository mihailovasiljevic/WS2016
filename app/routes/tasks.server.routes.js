var users = projects = require('../../app/controllers/users.server.controller'),
    tasks = require('../../app/controllers/tasks.server.controller');
//TODO: implement hasAuthorization function in taskSchema!
module.exports = function(app){

    app.route('/api/tasks')
    .post(/*users.requiresLogin,*/tasks.create)
    .get(/*users.requiresLogin,*/tasks.list);
    app.route('/api/tasks/:taskId')
      .get(/*users.requiresLogin,*/tasks.read)
      .put(/*users.requiresLogin,*/tasks.update)
      .delete(/*users.requiresLogin,*/tasks.delete);
    app.param('taskId', tasks.taskByID);
}
