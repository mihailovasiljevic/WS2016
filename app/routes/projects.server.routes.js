var projects = require('../../app/controllers/projects.server.controller');

module.exports = function(app){

    app.route('/projects')
    .post(projects.create)
    .get(projects.list);
    app.route('/projects/:projectId')
      .get(projects.read)
      .put(projects.update)
      .delete(projects.delete);
    app.param('projectId', projects.projectByID);
}
