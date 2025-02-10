import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameService } from '../services/game.service';

export const winnerGuard: CanActivateFn = (route, state) => {
  const players = inject(GameService).getPlayers();
  const router = inject(Router);
  if(players && players[0].score){
    return true;
  }
  
  return router.navigate(['/']);
};
