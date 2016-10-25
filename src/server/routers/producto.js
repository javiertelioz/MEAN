// Producto Model 
var Producto = require('../models/producto.model.js');

module.exports = function(app) {
  
  // select all
  app.get('/api/productos', function(req, res) {
    Producto.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/api/productos/count', function(req, res) {
    Producto.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/api/producto', function(req, res) {
    var obj = new Producto(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/api/producto/:id', function(req, res) {
    Producto.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/api/producto/:id', function(req, res) {
    Producto.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/api/producto/:id', function(req, res) {
    Producto.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
}