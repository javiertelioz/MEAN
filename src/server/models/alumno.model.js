var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = { 
  lean:  true,
  limit: 2
};


var alumnoSchema = mongoose.Schema({
    name: { 
    	type: String,
    	required: [true, 'name is required']
    },
    promedio: {
    	type: Number,
    	required: [true, 'promedio is required'],
    	min: [0, 'can not minor that 0'],
    	max: [10, 'can not mayor that 10']
    },
    edad:{
    	type:Number,
    	requiered: [true, 'edad is required']
    },
    regular: {
    	type: Boolean
    },
    faltas: {
    	type: Number,
    	required: [true, 'faltas is required'],
    	min: [0, 'can not minor that 0'],
    	max: [4, 'can not mayor that 10']
    }
});

alumnoSchema.plugin(mongoosePaginate);
var Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;