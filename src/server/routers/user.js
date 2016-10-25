// User Model
var User = require('../models/user.model.js');
var jwt = require('jsonwebtoken');
var middlewares = require('../middlewares/jwt');
var config = require('../config'); 

module.exports = function(app) {
  app.use(middlewares);

  app.post('/api/authenticate', function(req, res) {
    // find the user
    User.findOne({
      name: req.body.name
    }, function(err, user) {

      if (err) throw err;
      
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 1440 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });
  app.get('/api/token', function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          var decoded = jwt.decode(token, {complete: true});

          User.findOne({
            name: decoded.payload._doc.name
          }, function(err, user) {

            if (err) throw err;

            if (!user) {
              res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
              // check if password matches
              if (user.password != decoded.payload._doc.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                  expiresIn: 1440 // expires in 24 hours
                });
                // return the information including token as JSON
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });
              }
            }
          });
        }
      });
    } else {
      return res.status(403).send({ 
        success: false,
        message: 'No token provided.'
      });
    }
  });

  app.get('/setup', function(req, res) {
    // create a sample user
    var nick = new User({ 
      name: 'Nick Cerminara', 
      password: 'password',
      admin: true 
    });

    // save the sample user
    nick.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully');
      res.json({ success: true });
    });
  });  

  // select all
  app.get('/api/users', function(req, res) {
    User.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/api/users/count', function(req, res) {
    User.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/api/user', function(req, res) {
    var obj = new User(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/api/user/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/api/user/:id', function(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/api/user/:id', function(req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
}