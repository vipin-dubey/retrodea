var express = require('express');
var db = require('./model/db')
var bcrypt = require('bcryptjs');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var likes = routes('./routes/likes');
var dislikes = routes('./routes/dislikes');
var suggestions = routes('./routes/suggestions');
var participants = routes('./routes/participants');
var retros = routes('./routes/retros');
var projects = routes('./routes/projects');



var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/api/projects', projects);

app.post('/like/add',likes.add); // create new like
app.post('/like/edit',likes.edit); 
app.post('/like/delete',likes.doDelete); 

app.post('/dislike/add',dislikes.add); // create new like
app.post('/dislike/edit',dislikes.edit); 
app.post('/dislike/delete',dislikes.doDelete); 

app.post('/suggestion/add',suggestions.add); // create new like
app.post('/suggestion/edit',suggestions.edit); 
app.post('/suggestion/delete',suggestions.doDelete); 



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
