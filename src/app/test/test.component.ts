import { Component, OnInit } from '@angular/core';

import { Producto } from './producto';
import { PRODUCTOS } from './productos';

import { TestService } from './services/test.services';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService]
})

export class TestComponent implements OnInit {

  productos: Producto[];

  constructor(private testService: TestService) { }

  ngOnInit() {
    
    this.testService.getAlumnos()
      .subscribe(productos => this.productos = productos)
      
    this.productos = PRODUCTOS;

  }

  addProducto(producto) {
    if(producto.qty < producto.stock){
      producto.qty++
    }
  }

  removeProducto(producto) {
    if(producto.qty > 0){
      producto.qty--
    }
  }

  quedan(producto) {
    return producto.stock - producto.qty

  }

  total() {
    let total = 0;
    for(let producto of this.productos) {
      total += producto.qty * producto.price;
    }
    return total;
  }

  pedido(producto) {
    let pedido;
    return pedido = `pediste ${producto.qty} de ${producto.name}`;
  }
}
