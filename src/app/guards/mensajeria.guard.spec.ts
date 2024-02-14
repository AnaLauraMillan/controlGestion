import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mensajeriaGuard } from './mensajeria.guard';

describe('mensajeriaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mensajeriaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
