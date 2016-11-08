var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var productoSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		min: [10, 'Name can\'t minor that 10'],
		max: [70, 'Name can\'t high that 70']
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [0, 'Price can\'t minor that 0']
	},
	sku: {
		type: String,
		required: [true, 'Sku is required']
	},
	quantity: {
		type: Number,
		required: [true, 'Quantity is required'],
		min: [0, 'Quantity can\'t minor that 0'],
		max: [1000, 'Quantity can\'t high that 1000']
	},
	is_in_stock: {
		type: Boolean,
	},
	descripcion: {
		type: String,
		required: [true, 'Descripcion is required'],
		min: [15, 'Descripcion can\'t minor that 15'],
		max: [5000, 'Descripcion can\'t high that 5000']
	},
	imagen: {
		type: String,
		required: [true, 'Imagen is required'],
	},
	video: {
		type: String
	}
});

productoSchema.plugin(mongoosePaginate);
var Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;