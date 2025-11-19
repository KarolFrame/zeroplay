import { Component, OnInit } from '@angular/core';
import { GameServiceSearch } from '../../services/game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  filters = {
    title: '',
    genre: '',
    platform: '',
    tags: [] as string[],
  };

  tagsInput = '';
  games: any[] = [];

  genres = ['Shooter', 'MMORPG', 'MOBA', 'RPG', 'Strategy', 'Card Game'];
  platforms = ['PC', 'Browser', 'WebGL'];

  constructor(
    private gameService: GameServiceSearch,
    private gameState: GameStateService,
    private router: Router
  ) {}

  _scroolToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  _resetInputs = () => {};

  _search() {
    this.filters.tags = this.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    this.gameService.searchGames(this.filters).subscribe((res) => {
      this.gameState.setResults(res);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/results']);
      });
    });
    this._scroolToTop();
  }
}
