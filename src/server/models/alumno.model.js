var mongoose = require('mongoose');

var alumnoSchema = mongoose.Schema({
    name: String,
    promedio: Number,
    edad: Number,
    regular: Boolean,
    faltas: Number
});

var Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;