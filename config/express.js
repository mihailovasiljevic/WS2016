var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'), //provides logger middleware
    compress = require('compression'), //provides response compression
    bodyParser = require('body-parser'), //provides several middlewares to hande request data
    methodOverrride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'); //provides DELETE and PUT HTTp vergbs legacy support
module.exports = function() {
 var app = express();
 if(process.env.NODE_ENV === 'development'){
     app.use(morgan('dev')); //logging when running in development environment
 } else if(processe.env.NODE_ENV === 'production'){
     app.use(compress()); //compressing body when runing in production environment
 }

 app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use(bodyParser.json());
 app.use(methodOverrride());

 app.use(session({
     saveUninitialized: true,
     resave: true,
     secret: config.sessionSecret
 }));

 //app.set('views', './public/');
// app.set('view engine', 'ejs');
app.use(express.static( './public'));

 app.use(flash());

 app.use(passport.initialize()); //middleware for bootstraping passport module
 app.use(passport.session()); //middleware for Express session to keep track of user's session

 require('../app/routes/index.server.routes.js')(app);
 require('../app/routes/users.server.routes.js')(app);
 require('../app/routes/projects.server.routes.js')(app);
 require('../app/routes/tasks.server.routes.js')(app);
 require('../app/routes/comments.server.routes.js')(app);
 require('../app/routes/reports.server.routes.js')(app);
 
 app.use(express.static('./public')); //middleware for serving static files

 return app;
};
