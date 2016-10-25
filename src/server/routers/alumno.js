// Alumno Model
var Alumno = require('../models/alumno.model.js');

module.exports = function(app) {
  
  // select all
  app.get('/api/alumnos', function(req, res) {
    Alumno.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/api/alumnos/count', function(req, res) {
    Alumno.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/api/alumno', function(req, res) {
    var obj = new Alumno(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/api/alumno/:id', function(req, res) {
    Alumno.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/api/alumno/:id', function(req, res) {
    Alumno.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/api/alumno/:id', function(req, res) {
    Alumno.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
}