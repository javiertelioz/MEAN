import { Component } from '@angular/core';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { TestComponent } from './test/test.component';

import { CONFIG_APP } from './config/app';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = CONFIG_APP.APP_NAME;

	constructor(public auth:AuthService) {
	}
}