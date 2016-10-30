import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CONFIG_APP } from '../../config/app';
import { Alumno } from '../alumno';

@Injectable()
export class AlumnoService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) {}

	/**
	 * Get All Alumnos
	 * @return {Observable <Alumno[]>}
	 */
	getAlumnos() : Observable <Alumno[]> {
		return this.http.get(CONFIG_APP.APP_API_HOST + 'api/alumnos')
			.map(response => <Alumno[]> response.json())
			.catch(this.handleError);
	}

	/**
	 * Get Alumno by ID
	 * @param  {string}		id
	 * @return {Observable <Alumno[]>}
	 */
	getAlumno(id:string) : Observable <Alumno[]> {

		return this.http.get(CONFIG_APP.APP_API_HOST + `api/alumno/${id}`)
			.map(response => <Alumno[]> response.json())
			.catch(this.handleError);
	}
	/**
	 * Add New Alumno
	 * @param  {Object}		body
	 * @return {Observable<Alumno[]>}
	 */
	addAlumno (body: Object): Observable<Alumno[]> {
		// Stringify payload
		let bodyString = JSON.stringify(body); 
		
		// Using post request
		return this.http.post(CONFIG_APP.APP_API_HOST + 'api/alumno', bodyString, this.options) 
		.map((res:Response) => res.json())
		.catch(this.handleError);
	}
	/**
	 * Update Alumno
	 * @param  {Object}		body
	 * @return {Observable<Alumno[]>}
	 */
	updateAlumno (body: Object): Observable<Alumno[]> {
		// Stringify payload
		let bodyString = JSON.stringify(body);

		// Using put request
		return this.http.put(CONFIG_APP.APP_API_HOST + `api/alumno/${body['_id']}`, bodyString, this.options)
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}
	/**
	 * Remove Alumno
	 * @param  {string}		id
	 * @return {Observable<Alumno[]>}
	 */
	removeAlumno (id:string): Observable<Alumno[]> {
		// Using delete request
		return this.http.delete(CONFIG_APP.APP_API_HOST + `api/alumno/${id}`)
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}

	private handleError (error: Response | any) {
		// Message Error
		let errMsg: string;

		if (error instanceof Response) {
			const body = error.json() || 'Server error';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);

		return Observable.throw(errMsg);
  }
}