var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
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
		index: true,
		unique: true,
		required: [true, 'Sku is required']
	},
	quantity: {
		type: Number,
		required: [true, 'Quantity is required'],
		min: [0, 'Quantity can\'t minor that 0'],
		max: [1000, 'Quantity can\'t high that 1000']
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
	},
	manage_stock: {
      type: Boolean,
      required: [true, 'Manage Stock is required']
    },
	is_in_stock: {
		type: Boolean,
	},
	status: {
      type: String,
      enum: ['enable', 'disable'],
      required: [true, 'Status is required']
    }
});

productoSchema.plugin(uniqueValidator);
productoSchema.plugin(mongoosePaginate);

var Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;