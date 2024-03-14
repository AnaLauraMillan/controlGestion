import { TestBed } from '@angular/core/testing';

import { GetdatosService } from './getdatos.service';

describe('GetdatosService', () => {
  let service: GetdatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetdatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
