import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);

  if (localStorage.getItem('token')) {
    return true;
  } else {
    void router.navigate(['auth']);
    return false;
  }
};
