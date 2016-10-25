import { HomeComponent } from './home/home.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { TestComponent } from './test/test.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { VijusaComponent } from './vijusa/vijusa.component';

export const APP_ROUTES = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'productos',
		component: TestComponent
	},
	{
		path: 'alumnos',
		component: HelloWorldComponent
	},
	{
		path: 'spotify',
		component: SpotifyComponent
	},
	{
		path: 'vijusa',
		component: VijusaComponent
	}

]
