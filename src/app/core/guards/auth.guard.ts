import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  return user ? true : router.parseUrl('/login');
};