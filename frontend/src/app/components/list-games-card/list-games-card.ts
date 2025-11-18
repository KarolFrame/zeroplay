import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';
import { NgIf } from '@angular/common';
import { Game } from '../../services/games';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-games-card',
  imports: [AppIcon, NgIf, RouterLink],
  templateUrl: './list-games-card.html',
  styleUrls: ['./list-games-card.css'],
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

  _scroolToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
}
