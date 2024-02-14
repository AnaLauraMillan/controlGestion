import { CanActivateFn } from '@angular/router';

export const mensajeriaGuard: CanActivateFn = (route, state) => {
  return true;
};
