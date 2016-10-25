var jwt = require('jsonwebtoken');
var config = require('../config'); 
var routersAllow = require('./config.js');

var JWT = function(req, res, next) {
  console.log('Request URL:', req.originalUrl);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, Content-Length, X-Requested-With,');

  /*if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  }*/
  console.log(routersAllow.indexOf(req.originalUrl));
  if(routersAllow.indexOf(req.originalUrl))
  {
    return next();
  }

	// check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
  	// verifies secret and checks exp
  	jwt.verify(token, config.secret, function(err, decoded) {      
  		if (err) {
  			return res.json({ success: false, message: 'Failed to authenticate token.' });    
  		} else {
  			// if everything is good, save to request for use in other routes
  			req.decoded = decoded;
  			next();
  		}
  	});

  } else {
  	// if there is no token
  	// return an error
  	return res.status(403).send({ 
  		success: false,
  		message: 'No token provided.'
  	});
  }
};

module.exports = JWT;