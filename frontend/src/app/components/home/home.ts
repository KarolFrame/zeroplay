import { Component, OnInit } from '@angular/core';
import { ListGames } from '../list-games/list-games';
import { GamesServiceTop5, GamesServiceLatest5 } from '../../services/games';
import { Game } from '../../services/games';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { Loader } from '../loader/loader';

interface HomeLists {
  top5List: Game[];
  top5Latest: Game[];
}

@Component({
  selector: 'app-home',
  imports: [ListGames, CommonModule, Loader, Loader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  homeLists: HomeLists = {
    top5List: [],
    top5Latest: [],
  };

  isLoading: boolean = true;

  constructor(
    private gamesServiceTop5: GamesServiceTop5,
    private gameServiceLatest5: GamesServiceLatest5
  ) {}

  ngOnInit(): void {
    const top5$: Observable<Game[]> = this.gamesServiceTop5.listGames();
    const latest5$: Observable<Game[]> = this.gameServiceLatest5.listGames();
    forkJoin([top5$, latest5$]).subscribe({
      next: ([top5Data, latest5Data]) => {
        this.homeLists.top5List = top5Data;
        this.homeLists.top5Latest = latest5Data;
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
