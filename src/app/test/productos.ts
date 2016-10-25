import { Producto } from './producto';

export const PRODUCTOS:Producto[] = [
	{
		id: 1,
		name: 'Torta de Jamon',
		price: 26,
		sku: 'Torta-jamon',
		qty: 0,
		stock: 10,
		descripcion: 'Torta del chavo (Jamon)',
		imagen : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSDct9m77w39JJweRTCfao3Xn1YpbHo1tcp5eOV2zJxPlxMjOTJ'
	},
	{
		id: 2,
		name: 'Torta de Queso',
		price: 46,
		sku: 'Torta-queso',
		qty: 0,
		stock: 10,
		descripcion: 'Torta de Queso',
		imagen : 'http://www.meals.com/ImagesRecipes/146232lrg.jpg'
	},
	{
		id: 3,
		name: 'Torta de Salchicha',
		price: 20,
		sku: 'Torta-salchicha',
		qty: 0,
		stock: 10,
		descripcion: 'torta de Salchicha',
		imagen : 'http://tortaslamichoacana.com/wp-content/uploads/2014/02/392A4365.jpg'
	},
	{
		id: 4,
		name: 'Torta de Huevo',
		price: 19,
		sku: 'Torta-huevo',
		qty: 0,
		stock: 10,
		descripcion: 'torta Huevo',
		imagen : 'http://www.meals.com/ImagesRecipes/146232lrg.jpg'
	},
	{
		id: 5,
		name: 'Refresco',
		price: 15,
		sku: 'Refresco-Variados',
		qty: 0,
		stock: 10,
		descripcion: 'Refresco de Sabor (Coca-cola, Sprite, Manzanita, Fanta)',
		imagen : 'http://www.normarabago.com/wp-content/uploads/2016/02/refrescos.jpg'
	}
]