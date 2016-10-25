var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var config = require('./config'); 

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));

app.set('superSecret', config.secret);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect(config.database);
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Routers
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB'); 
});

// APIs
require('./routers/cat.js')(app);
require('./routers/user.js')(app);
require('./routers/alumno.js')(app);
require('./routers/producto.js')(app);

// all other routes are handled by Angular
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname,'/../../dist/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
  console.log('check here http://localhost:4200:');
});

module.exports = app;