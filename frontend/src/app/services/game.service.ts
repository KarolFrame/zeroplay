import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameServiceSearch {
  private baseUrl = 'http://localhost:8000/games';

  constructor(private http: HttpClient) {}
  searchGames(filters: {
    title?: string;
    genre?: string;
    platform?: string;
    tags?: string[];
  }): Observable<any[]> {
    let params = new HttpParams();

    if (filters.title) {
      params = params.set('title', filters.title);
    }
    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }
    if (filters.platform) {
      params = params.set('platform', filters.platform);
    }
    if (filters.tags && filters.tags.length > 0) {
      params = params.set('tags', filters.tags.join(','));
    }

    return this.http.get<any[]>(this.baseUrl, { params });
  }
}
