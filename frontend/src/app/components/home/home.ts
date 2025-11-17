import { Component, OnInit } from '@angular/core';
import { ListGames } from '../list-games/list-games';
import { GamesServiceTop5, GamesServiceLatest5 } from '../../services/games';
import { Game } from '../../services/games';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

interface HomeLists {
  top5List: Game[];
  top5Latest: Game[];
}

@Component({
  selector: 'app-home',
  imports: [ListGames, CommonModule, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  homeLists: HomeLists = {
    top5List: [],
    top5Latest: [],
  };

  constructor(
    private gamesServiceTop5: GamesServiceTop5,
    private gameServiceLatest5: GamesServiceLatest5
  ) {}

  _getTop5 = () => {
    this.gamesServiceTop5.listGames().subscribe((data) => {
      this.homeLists.top5List = data;
    });
  };
  _getLatest5 = () => {
    this.gameServiceLatest5.listGames().subscribe((data) => {
      this.homeLists.top5Latest = data;
    });
  };

  ngOnInit(): void {
    this._getTop5();
    this._getLatest5();
  }
}
