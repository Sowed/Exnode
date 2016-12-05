var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongo = require('mongodb');
var monk = require('monk');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views-jade'));
app.set('view engine', 'jade');

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Make our Mongo Database accesible to the app
var db = monk('localhost:27017/exnodedb');
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err);

    //res.send('404: Page not Found', 404);
    res.status(400);
    res.render('error-404', {
        title: '404: Page Not Found',
        message: err.message,
        error: err
    });
    //next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error-500', {
            title: '500: Internal Server Error',
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

var server = app.listen(3040, function() {
    console.log('Evesdropping on port 3040');
});
