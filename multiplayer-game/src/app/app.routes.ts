import { Routes } from '@angular/router';
import { GameComponent } from './game.component';

export const routes: Routes = [
  {
    path: 'game', // This defines the route path for the GameComponent
    component: GameComponent // Load GameComponent on this route
  },
  {
    path: '', // Default route
    redirectTo: '/game',
    pathMatch: 'full'
  }
];
