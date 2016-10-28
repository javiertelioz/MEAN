// Alumno Model
var Alumno = require('../models/alumno.model.js');

module.exports = function(app) {
  
  // Get all Alumno
  app.get('/api/alumnos', function(req, res) {
    Alumno.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // Count all
  app.get('/api/alumnos/count', function(req, res) {
    Alumno.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // Get Alumno by ID
  app.get('/api/alumno/:id', function(req, res) {
    Alumno.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // Create new Alumno
  app.post('/api/alumno', function(req, res) {
    console.log(req.body);
    var obj = new Alumno(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // Update Alumno By ID
  app.put('/api/alumno/:id', function(req, res) {
    Alumno.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // Delete Alumno By ID
  app.delete('/api/alumno/:id', function(req, res) {
    Alumno.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
}