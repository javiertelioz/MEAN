var express = require('express');
var cors = require('cors');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();
var expressWs = require('express-ws')(app);

app.set('port', (process.env.PORT || 3000));
app.set('superSecret', config.secret);

app.use(cors());
app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database);
var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to MongoDB'); 
});

// API's Routers
require('./routers/cat.js')(app);
require('./routers/user.js')(app);
require('./routers/alumno.js')(app);
require('./routers/producto.js')(app);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

// all other routes are handled by Angular
app.get('/app/*', function(req, res) {
  res.sendFile(path.join(__dirname,'/../../dist/index.html'));
});

app.ws('/', function(ws, req) {
	ws.on('message', function(msg) {
		console.log(msg);
	});
  console.log('socket', req.testing);
});

app.listen(app.get('port'), function() {
  console.log('MEAN Full Stack listening on port ' + app.get('port') +
  	'\nCheck here http://localhost:' + app.get('port'));
});

module.exports = app;