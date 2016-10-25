import { Component, OnInit } from '@angular/core';
import { AlumnoService } from './services/alumno.services';
import { Alumno } from './alumno';

@Component({
  selector: 'app-vijusa',
  templateUrl: './vijusa.component.html',
  styleUrls: ['./vijusa.component.css'],
  providers: [AlumnoService]
})
export class VijusaComponent implements OnInit {

	private alumnos: Alumno[];

  constructor(private alumnoService:AlumnoService) { }

  ngOnInit() {
  	this.alumnoService.getAlumnos()
  		.subscribe(alumnos => this.alumnos = alumnos);
  }
}
