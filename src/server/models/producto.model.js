var mongoose = require('mongoose');

var productoSchema = mongoose.Schema({
    name: String,
	price: Number,
	sku: String,
	qty: Number,
	stock: Number,
	descripcion: String,
	imagen: String
});

var Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;