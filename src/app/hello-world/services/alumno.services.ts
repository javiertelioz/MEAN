import { Alumno } from '../alumno';
import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()

export class AlumnoService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getAlumnos() {
		return this.http.get('/api/alumnos')
			.map(response => <Alumno[]> response.json());
	}
}