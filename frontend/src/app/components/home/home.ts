import { Component, OnInit } from '@angular/core';
import { ListGames } from '../list-games/list-games';
import {
  GamesServiceTop10 as GamesServiceTop10,
  GamesServiceLatest10 as GamesServiceLatest10,
  GamesServiceTrending,
} from '../../services/games';
import { Game } from '../../services/games';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { Loader } from '../loader/loader';

interface HomeLists {
  top10List: Game[];
  top10Latest: Game[];
  topTrending: Game[];
}

@Component({
  selector: 'app-home',
  imports: [ListGames, CommonModule, Loader, Loader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  homeLists: HomeLists = {
    top10List: [],
    top10Latest: [],
    topTrending: [],
  };

  isLoading: boolean = true;

  constructor(
    private gamesServiceTop10: GamesServiceTop10,
    private gameServiceLatest10: GamesServiceLatest10,
    private gameServiceTrending: GamesServiceTrending
  ) {}

  ngOnInit(): void {
    const top10$: Observable<Game[]> = this.gamesServiceTop10.listGames();
    const latest10$: Observable<Game[]> = this.gameServiceLatest10.listGames();
    const trending10$: Observable<Game[]> = this.gameServiceTrending.listGames();
    forkJoin([top10$, latest10$, trending10$]).subscribe({
      next: ([top10Data, latest10Data, trendingData]) => {
        this.homeLists.top10List = top10Data;
        this.homeLists.top10Latest = latest10Data;
        this.homeLists.topTrending = trendingData;
      },
      error: (err) => {
        console.error('Error al cargar las listas de juegos:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
