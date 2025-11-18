import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Game } from '../../services/games';
import { CommonModule } from '@angular/common';
import { ListGamesCard } from '../list-games-card/list-games-card';
import { AppIcon } from '../app-icon/app-icon';

@Component({
  selector: 'app-list-games',
  imports: [CommonModule, ListGamesCard, AppIcon],
  templateUrl: './list-games.html',
  styleUrls: ['./list-games.css'],
})
export class ListGames implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input() listName: string = '';
  @Input() gameList: Game[] = [];

  _showLeftButton: boolean = false;
  _showRightButton: boolean = true;

  ngOnInit() {
    this._showRightButton = this.gameList.length > 4;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._checkScrollPosition();
      this.scrollContainer.nativeElement.addEventListener(
        'scroll',
        this._checkScrollPosition.bind(this)
      );
    }, 0);
  }

  _checkScrollPosition() {
    const element = this.scrollContainer.nativeElement;

    if (element.scrollWidth <= element.clientWidth) {
      this._showLeftButton = false;
      this._showRightButton = false;
      return;
    }

    this._showLeftButton = element.scrollLeft > 0;

    const isAtEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 10;
    this._showRightButton = !isAtEnd;
  }

  _scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(() => this._checkScrollPosition(), 300);
  }

  _scrollRight() {
    const element = this.scrollContainer.nativeElement;
    this._checkScrollPosition();

    if (this._showRightButton) {
      element.scrollBy({ left: 300, behavior: 'smooth' });
    } else {
      element.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setTimeout(() => this._checkScrollPosition(), 300);
  }
}
