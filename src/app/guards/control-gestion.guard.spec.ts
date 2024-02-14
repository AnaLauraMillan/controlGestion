import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { controlGestionGuard } from './control-gestion.guard';

describe('controlGestionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlGestionGuard(...guardParameters));
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

