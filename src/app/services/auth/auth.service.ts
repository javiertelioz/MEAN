import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt/angular2-jwt';

import { CONFIG_APP } from '../../config/app';

@Injectable()
export class AuthService {

	public jwtHelper:JwtHelper = new JwtHelper();
  public headers:Headers = new Headers;
  public messages = [];

  constructor(public http: Http, public authHttp:AuthHttp, private router: Router) {
  	this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  login(params) {

  	return this.http.post(
      CONFIG_APP.APP_API_HOST + 'api/authenticate',
  		'email=' + params.email +'&password=' + params.password,
  		{
  			headers: this.headers
  		})
  	.subscribe(
  		res => {
  			localStorage.setItem('id_token', res.json().token);
        this.router.navigate(['home']);
        window.location.reload();
  		},
  		error => {
        let body = JSON.parse(error._body);
        this.messages.push({
          message: "Email and password do not match.",
          error: body.error,
          status: error.status,
          text: error.statusText
        });
  		}
  	);
  }

  getEmailUserLogged() {
  	this.authHttp.get(CONFIG_APP.APP_API_HOST + 'api/token')
  		.subscribe(
	  		(data: Response) => {
          localStorage.setItem('id_token', data.json().token);
	  			//console.log(data.json().token);
	  		},
	  		err => console.log(err),
	  		() => console.log('Complete')
  		);
  }

  tokenSubscription() {
  	this.authHttp.tokenStream
  		.subscribe(
  			data => console.log(data),
  			err => console.log(err),
  			() => console.log('Complete')
  		);
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');
    var info = {
      'decoded': this.jwtHelper.decodeToken(token),
      'expiration_date': this.jwtHelper.getTokenExpirationDate(token),
      'is_exired': this.jwtHelper.isTokenExpired(token)
    }
    console.log(info);
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  loggedIn() {
    return tokenNotExpired();
  }
}