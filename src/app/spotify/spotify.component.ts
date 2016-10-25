import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.services';
import { Song } from './song';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css'],
  providers: [SpotifyService]
})
export class SpotifyComponent implements OnInit {

	private songs: Song[];
	private songAudio = new Audio;
	private rola = null;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search(song) {
  	this.spotifyService.getSong(song)
  		.subscribe(songs => this.songs = songs);
  }

  play(song) {

  	this.rola = song;
  	this.songAudio.src = song.preview_url;
  	this.songAudio.play();
  }
}
