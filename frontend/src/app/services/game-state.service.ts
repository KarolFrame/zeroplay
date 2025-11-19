import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private _lastResults: any[] = [];

  setResults(results: any[]) {
    this._lastResults = results;
  }

  getResults(): any[] {
    return this._lastResults;
  }
}
