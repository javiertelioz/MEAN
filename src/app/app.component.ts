import { Component } from '@angular/core';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'Curso de Angular 2';
}
