import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { GameDetailComponent } from './components/game-detail-component/game-detail-component';
import { ResultsComponent } from './components/results-component/results-component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'game/:id', component: GameDetailComponent },
  { path: 'results', component: ResultsComponent },
];
