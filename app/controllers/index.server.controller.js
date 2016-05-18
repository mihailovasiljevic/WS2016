exports.render = function(req, res) {
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    res.render('index', { //first paramtere name of ejs template without .ejs
        title: 'Hello World', //list of parameters used in ejs template
        userFullName: req.user? req.user.fullName : ''
    });
};

exports.getErrorMessage = function(err){
    if(err.errors){
        for(var errName in err.errors){
            if(err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Uknown server error';
    }
};