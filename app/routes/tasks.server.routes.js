var tasks = require('../../app/controllers/tasks.server.controller');

module.exports = function(app){

    app.route('/tasks')
    .post(tasks.create)
    .get(tasks.list);
    app.route('/tasks/:taskId')
      .get(tasks.read)
      .put(tasks.update)
      .delete(tasks.delete);
    app.param('taskId', tasks.taskByID);
}
