import { Component, OnInit } from '@angular/core';
import { Game, GameService } from '../../services/games';
import { ActivatedRoute } from '@angular/router';
import { GameDetailComponentBanner } from '../game-detail-component-banner/game-detail-component-banner';
import { GameDetailComponentDetails } from '../game-detail-component-details/game-detail-component-details';
import { ListGames } from '../list-games/list-games';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-detail-component',
  imports: [GameDetailComponentBanner, GameDetailComponentDetails, ListGames],
  templateUrl: './game-detail-component.html',
  styleUrl: './game-detail-component.css',
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;
  relatedGames: Game[] = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private gameService: GameService) {}

  _getGameInfo = () => {
    this.route.paramMap.subscribe((params) => {
      const gameId = params.get('id');
      if (gameId) {
        const idNumber = +gameId;
        this.gameService.getGameDetails(idNumber).subscribe({
          next: (data) => {
            this.game = data;
          },
          error: (err) => {
            console.error('Error al cargar el juego:', err);
            this.game = undefined;
          },
        });
        this.gameService.getRelatedGames(idNumber).subscribe({
          next: (data) => {
            this.relatedGames = data;
          },
          error: (err) => {
            console.error('Error al cargar juegos relacionados:', err);
          },
        });
      }
    });
  };

  ngOnInit(): void {
    this._getGameInfo();
  }
}
