import { Component, Input } from '@angular/core';
import { Game } from '../../services/games';

@Component({
  selector: 'app-game-detail-component-banner',
  imports: [],
  templateUrl: './game-detail-component-banner.html',
  styleUrl: './game-detail-component-banner.css',
})
export class GameDetailComponentBanner {
  @Input() game: Game | undefined;
}
