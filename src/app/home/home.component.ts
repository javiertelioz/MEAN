import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, provideAuth, tokenNotExpired, JwtHelper } from 'angular2-jwt/angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthHttp, provideAuth({
    headerName: 'Authorization',
    headerPrefix: 'x-access-token',
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true,
    noTokenScheme: true
  })]
})
export class HomeComponent implements OnInit {

	jwtHelper:JwtHelper = new JwtHelper();
  headers:Headers = new Headers;

  constructor(public http:Http, public authHttp:AuthHttp) {
  	this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }

  ngOnInit() {
  }

  login() {
  	return this.http.post(
  		'http://localhost:3000/api/authenticate',
  		'name=Nick Cerminara&password=password',
  		{
  			headers: this.headers
  		})
  		.subscribe(
  			res => {
  				localStorage.setItem('id_token', res.json().token);
  			},
  			error => {
  				console.log(error);
  			});
  }
  getEmailUserLogged() {
  	let token = localStorage.getItem('id_token');

    this.headers.append('Authorization', `x-access-token ${token}`);
    let options = new RequestOptions({ headers: this.headers });

  	this.authHttp.get('http://localhost:3000/api/token', options)
  	.subscribe(
  		(data) => {
  			localStorage.setItem('id_token', data.json().token);
  		},
  		err => console.log(err),
  		() => console.log('Complete')
  	);
  }

  useJwtHelper() {
  	let token = localStorage.getItem('id_token');
  	let info = {
  		'decoded': this.jwtHelper.decodeToken(token),
  		'expiration_date': this.jwtHelper.getTokenExpirationDate(token),
  		'is_exired': this.jwtHelper.isTokenExpired(token)
  	}
  	console.log(info);
  }

  logout() {
  	localStorage.removeItem('id_token');
  }

  loggedIn() {
  	return tokenNotExpired();
  }
}
