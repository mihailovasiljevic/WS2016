var users = projects = require('../../app/controllers/users.server.controller'),
    comments = require('../../app/controllers/comments.server.controller');
//TODO: implement hasAuthorization function in taskSchema!
module.exports = function(app){

    app.route('/api/comments')
    .post(users.requiresLogin,comments.create)
    .get(comments.list);
    app.route('/api/comments/:commentId')
      .get(users.requiresLogin,comments.read)
      .put(users.requiresLogin,comments.update)
      .delete(users.requiresLogin,comments.delete);
    app.param('commentId', comments.commentByID);
}
