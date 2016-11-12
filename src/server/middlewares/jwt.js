var jwt = require('jsonwebtoken');
var config = require('../config');


var checkRouter = function (url, method) {

  var routers = config.routesWithoutToken;
  var method = method || 'GET';

  for (var i=0; i < routers.length; i++) {
    if (url.indexOf(routers[i].router) != -1) {
      if(routers[i].methods == "*") return true;
      if(routers[i].methods.indexOf(method) != -1 ) return true;
    }
  }
  return false;
}

var JWT = function(req, res, next) {
  
  if(checkRouter(req.originalUrl, req.method)) {
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
  	// if there is no token return an error
  	return res.status(403).send({ 
  		success: false,
  		message: 'No token provided.'
  	});
  }
};

module.exports = JWT;