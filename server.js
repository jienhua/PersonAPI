// modules =====================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan         = require('morgan');

// set our port
var port = process.env.PORT || 8000;


// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+josn as json
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/UPDATE
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/dist'));

app.use(morgan('dev'));
// routes =========================================================
// configure our routes
require('./src/server/app/routes')(app); 

// start app ======================================================
app.listen(port);

console.log('port listen on : ' + port);

// expose app
exports = module.exports = app;