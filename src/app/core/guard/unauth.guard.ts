import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const unauthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);

  if (!localStorage.getItem('token')) {
    return true;
  } else {
    void router.navigate(['sensor']);
    return false;
  }
};
