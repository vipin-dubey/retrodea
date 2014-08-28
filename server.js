var express = require('express');
var db = require('./model/db');
var bcrypt = require('bcryptjs');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

//var likes = require('./routes/likes');
//var dislikes = require('./routes/dislikes');
//var suggestions = require('./routes/suggestions');
//var participants = require('./routes/participants');
//var retros = require('./routes/retros');
var projects = require('./routes/projects');



var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/api/projects', projects);

app.get('/api/projects',projects.projects);
app.get('/api/projects/:id',projects.project);
app.post('/api/projects',projects.createProject);
//app.put('api/project/:id',projects.updateProject);
//app.delete('api/project/:id',projects.destroyProject);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// });

module.exports = app;
