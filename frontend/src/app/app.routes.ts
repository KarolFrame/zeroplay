import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { GameDetailComponent } from './components/game-detail-component/game-detail-component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'game/:id', component: GameDetailComponent },
];
