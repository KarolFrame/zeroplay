import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../services/games';
import { GamesServiceTop5 } from '../../services/games';
import { CommonModule } from '@angular/common';
import { ListGamesCard } from '../list-games-card/list-games-card';

@Component({
  selector: 'app-list-games',
  imports: [CommonModule, ListGamesCard],
  templateUrl: './list-games.html',
  styleUrls: ['./list-games.css'],
})
export class ListGames {
  @Input() listName: string = '';
  @Input() gameList: Game[] = [];
}
