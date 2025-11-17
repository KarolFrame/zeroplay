import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';
import { NgIf } from '@angular/common';
import { Game } from '../../services/games';

@Component({
  selector: 'app-list-games-card',
  imports: [AppIcon, NgIf],
  templateUrl: './list-games-card.html',
  styleUrl: './list-games-card.css',
})
export class ListGamesCard {
  @Input() game!: Game;

  get tagsList(): string[] {
    try {
      return this.game.tags ? JSON.parse(this.game.tags) : [];
    } catch {
      return [];
    }
  }
}
