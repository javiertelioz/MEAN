import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { SpotifyComponent } from './spotify/spotify.component';

import { APP_ROUTES } from './app.routes';
import { VijusaComponent } from './vijusa/vijusa.component';
import { CatComponent } from './cat/cat.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    TestComponent,
    HomeComponent,
    SpotifyComponent,
    VijusaComponent,
    CatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
