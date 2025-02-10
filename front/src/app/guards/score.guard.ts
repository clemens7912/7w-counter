import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameService } from '../services/game.service';

export const scoreGuard: CanActivateFn = (route, state) => {
  const players = inject(GameService).getPlayers();
  const router = inject(Router);
  if(players && players.length > 0){
    return true;
  }
  
  return router.navigate(['/']);
};
