import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { direccionGuard } from './direccion.guard';

describe('direccionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => direccionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
