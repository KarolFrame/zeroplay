import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  name: string;
  genre?: string;
  platform?: string;
  publisher?: string;
  developer?: string;
  release_date?: string;
  game_url?: string;
  description?: string;
  image_url?: string;
  rank?: number;
  tags?: string;
  bggrating?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GamesServiceTop5 {
  private apiUrl = 'http://127.0.0.1:8000/api/top5';

  constructor(private http: HttpClient) {}

  listGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GamesServiceLatest5 {
  private apiUrl = 'http://127.0.0.1:8000/api/latest5';

  constructor(private http: HttpClient) {}

  listGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://127.0.0.1:8000/api/games';

  constructor(private http: HttpClient) {}
  getGameDetails(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }
  getRelatedGames(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/${id}/related`);
  }
}
