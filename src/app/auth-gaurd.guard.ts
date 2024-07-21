import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if(!isLoggedIn){
    alert('Please Login First');
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
