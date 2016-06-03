var users = require('../../app/controllers/users.server.controller'),
    reports = require('../../app/controllers/reports.server.controller');

module.exports = function(app) {

    app.route('/api/report_1/:report1Id') //reportId = projectId
      .get(/*users.requiresLogin,*/reports.report1);
    app.param('report1Id', reports.report1);
	
	app.route('/api/report_2/:report2Id') //reportId = projectId
      .get(/*users.requiresLogin,*/reports.report2);
    app.param('report2Id', reports.report2);

    app.route('/api/report_3/:report3Id')
      .get(/*users.requiresLogin,*/reports.report3);
    app.param('report3Id', reports.report3);


    app.route('/api/report_4/:report4Id')
      .get(/*users.requiresLogin,*/reports.report4);
    app.param('report4Id', reports.report4);

    app.route('/api/report_5/:report5Id')
      .get(/*users.requiresLogin,*/reports.report5);
    app.param('report5Id', reports.report5);

	
}