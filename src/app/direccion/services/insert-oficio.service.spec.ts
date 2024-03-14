import { TestBed } from '@angular/core/testing';

import { InsertOficioService } from './insert-oficio.service';

describe('InsertOficioService', () => {
  let service: InsertOficioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertOficioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
