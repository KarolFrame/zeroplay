import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListGames } from './components/list-games/list-games';
import { Header } from './components/header/header';
import { Foother } from './components/foother/foother';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Foother],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
