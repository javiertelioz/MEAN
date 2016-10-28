import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { provideAuth } from 'angular2-jwt/angular2-jwt';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';

import { AppComponent } from './app.component';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { SpotifyComponent } from './spotify/spotify.component';

import { APP_ROUTES } from './app.routes';
import { CatComponent } from './cat/cat.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    TestComponent,
    HomeComponent,
    SpotifyComponent,
    CatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    AuthService,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'Bearer',
      tokenName: 'id_token',
      tokenGetter: (() => localStorage.getItem('id_token')),
      globalHeaders: [{'Content-Type':'application/json'}],
      noJwtError: true,
      noTokenScheme: true
    }),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
