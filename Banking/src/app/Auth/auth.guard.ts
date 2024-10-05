import { AuthService } from './../service/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router)

  const currentUser = authService.getCurrentUser();
  if(currentUser){
    return true;
  }
  else{
    router.navigate(['/auth/login'])
    return false
  }

};

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router)

  const currentUser = authService.getCurrentUser();
  if(currentUser){
    router.navigate(['/dashboard'])
    return false;
  }
  else{
    return true
  }

};

