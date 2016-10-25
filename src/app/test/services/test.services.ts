import { Producto } from '../producto';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TestService {

	constructor(private http: Http) { }

	getAlumnos() {
		return this.http.get('app/test/data.json')
			.map(response => <Producto[]> response.json().data);
	}
}