// Producto Model 
var Producto = require('../models/producto.model.js');
//var jwt = require('../middlewares/jwt');

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
  app.post('/api/producto', function(req, res) {
    
    var obj = new Producto(req.body);
    var errMessage = {
      message: null,
      data : null,
      errors: []
    };

    obj.save(function(err, obj) {
      if(err) {
        for (var errName in err.errors) {
          errMessage.errors.push(err.errors[errName].message);
        }
        errMessage.message = "There was an error saving.";

        res.status(200).json(errMessage);
      };

      errMessage.message = "Has been successfully saved.";
      errMessage.data = obj;

      res.status(201).json(errMessage);
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

    var errMessage = {
      message: null,
      data : null,
      errors: []
    };

    Producto.findOneAndUpdate({_id: req.params.id}, req.body, function(err, obj)  {

      if(err) {

        errMessage.message = "There was an error saving.";
        errMessage.errors.push(err.message);
        
        res.json(errMessage);
      }

      errMessage.message = "Has been successfully updated.";
      errMessage.data = obj;
      res.status(200).json(errMessage);
    })
  });

  // Delete By ID
  app.delete('/api/producto/:id', function(req, res) {

    var errMessage = {
      message: null,
      data : null,
      errors: []
    };

    Producto.findOneAndRemove({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);

      errMessage.message = "Has been successfully deleted.";
      errMessage.data = null;
      res.status(200).json(errMessage);
    });
  });
}