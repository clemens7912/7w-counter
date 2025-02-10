import { Routes } from '@angular/router';
import { scoreGuard } from './guards/score.guard';
import { winnerGuard } from './guards/winner.guard';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'match',
        loadComponent: () => import('./components/players/players.component').then(c => c.PlayersComponent),
        canActivate: [authGuard]
    },
    {
        path: 'score',
        loadComponent: () => import('./components/scores/scores.component').then(c => c.ScoresComponent),
        canActivate: [scoreGuard]
    },
    {
        path: 'winner',
        loadComponent: () => import('./components/winner/winner.component').then(c => c.WinnerComponent),
        canActivate: [winnerGuard]
    },
    {
        path: 'stats',
        loadComponent: () => import('./components/stats/stats.component').then(c => c.StatsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'credits',
        loadComponent: () => import('./components/creditos/creditos.component').then(c => c.CreditosComponent)
    }
];
