import { Component, OnInit } from '@angular/core';
import { Game } from '../../services/games';
import { GameStateService } from '../../services/game-state.service';
import { ListGamesCard } from '../list-games-card/list-games-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-component',
  imports: [ListGamesCard, CommonModule],
  templateUrl: './results-component.html',
  styleUrl: './results-component.css',
})
export class ResultsComponent implements OnInit {
  gameList: Game[] = [];
  pagedGames: Game[] = [];
  notFound: string[] = [
    'Oops! No games around here… 🎮',
    'Looks like the search went on vacation! 🌴',
    'No games found… maybe try magic? ✨',
    'Nothing here… did you check another galaxy? 🌌',
    'Your search came up empty… time to play hide and seek! 🕵️‍♂️',
    'Whoops! The pixels ran away. 🏃‍♂️💨',
    'No luck! Try another spell. 🔮',
    'The search party found nothing… again. 🎯',
    'Game not found. Did you lose it in the couch? 🛋️',
    '404 games not found… just kidding! 😎',
    'This search is on a coffee break. ☕',
    'No games here, maybe check under the bed? 🛏️',
    'Empty… but your adventure awaits! 🗺️',
    'Nothing to see here, move along! 👀',
    'Your quest for games returned… nada. ⚔️',
  ];

  randomMessaje: string = '';

  pageSize = 8;
  currentPage = 1;
  totalPages = 1;

  constructor(private gameState: GameStateService) {}
  _setRandomMessaje = () => {
    const index = Math.floor(Math.random() * this.notFound.length);
    this.randomMessaje = this.notFound[index];
  };

  _scroolToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  _setupPagination() {
    this.totalPages = Math.ceil(this.gameList.length / this.pageSize);
    this._goToPage(1);
    this._scroolToTop();
  }

  _goToPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.pagedGames = this.gameList.slice(start, start + this.pageSize);
    this._scroolToTop();
  }

  _prevPage() {
    if (this.currentPage > 1) this._goToPage(this.currentPage - 1);
    this._scroolToTop();
  }

  _nextPage() {
    if (this.currentPage < this.totalPages) this._goToPage(this.currentPage + 1);
    this._scroolToTop();
  }

  get visiblePages() {
    const pages = [];
    if (this.totalPages <= 3) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else if (this.currentPage === 1) {
      pages.push(1, 2, 3);
    } else if (this.currentPage === this.totalPages) {
      pages.push(this.totalPages - 2, this.totalPages - 1, this.totalPages);
    } else {
      pages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
    }
    return pages.filter((p) => p > 0 && p <= this.totalPages);
  }

  ngOnInit(): void {
    this.gameList = this.gameState.getResults();
    this._setRandomMessaje();
    this._setupPagination();
  }
}
