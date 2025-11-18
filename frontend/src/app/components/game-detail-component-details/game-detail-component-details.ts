import { Component, Input } from '@angular/core';
import { Game } from '../../services/games';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-detail-component-details',
  imports: [CommonModule],
  templateUrl: './game-detail-component-details.html',
  styleUrl: './game-detail-component-details.css',
})
export class GameDetailComponentDetails {
  @Input() game: Game | undefined;
}
