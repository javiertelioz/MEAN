import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import { Alumno } from '../alumno';

import 'rxjs/add/operator/map';

@Injectable()
export class AlumnoService {

	constructor(private http: Http) { }

	getAlumnos(){
		return this.http.get('http://vijusamexico.net/alumnos/')
			.map(response => <Alumno[]> response.json());
	}
}