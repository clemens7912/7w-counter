import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(StorageService).isLoggedIn()){
    return true
  }

  const router = inject(Router);

  return router.navigate(['/'], {queryParams: {login: 'true'}});
};
