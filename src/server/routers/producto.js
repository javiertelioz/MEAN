// Producto Model 
var Producto = require('../models/producto.model.js');
var jwt = require('../middlewares/jwt');

module.exports = function(app) {

  // Count all
  app.get('/api/productos/count', function(req, res) {
    Producto.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });
  
  // Select all
  app.get('/api/producto/:page?/:order?', function(req, res) {
    var page = req.params.page ? req.params.page : 1;

    Producto.paginate({}, { page: page }, function(err, docs) {
      if(err) return console.error(err);

      res.json(docs);
    });
  });  

  // Create
  app.post('/api/producto',jwt, function(req, res) {
    var obj = new Producto(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // Show By ID
  app.get('/api/producto/:id', function(req, res) {
    Producto.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // Update By ID
  app.put('/api/producto/:id', function(req, res) {
    Producto.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // Delete By ID
  app.delete('/api/producto/:id', function(req, res) {
    Producto.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
}