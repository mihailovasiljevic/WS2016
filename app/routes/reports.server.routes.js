var users = require('../../app/controllers/users.server.controller'),
    reports = require('../../app/controllers/reports.server.controller');

module.exports = function(app) {

    app.route('/api/report_1/:report1Id') //reportId = projectId
      .get(/*users.requiresLogin,*/reports.report1);
    app.param('report1Id', reports.report1);
	
	app.route('/api/report_2/:report2Id') //reportId = projectId
      .get(/*users.requiresLogin,*/reports.report2);
    app.param('report2Id', reports.report2);
	
}