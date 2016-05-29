var users = projects = require('../../app/controllers/users.server.controller'),
    comments = require('../../app/controllers/comments.server.controller');
//TODO: implement hasAuthorization function in taskSchema!
module.exports = function(app){

    app.route('/api/comments')
    .post(comments.create)
    .get(comments.list);
    app.route('/api/comments/:commentId')
      .get(comments.read)
      .put(comments.update)
      .delete(comments.delete);
    app.param('commentId', comments.commentByID);
}
