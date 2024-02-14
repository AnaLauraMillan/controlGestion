import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admGGuard } from './adm-g.guard';

describe('admGGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admGGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
