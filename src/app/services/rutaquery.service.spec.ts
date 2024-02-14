import { TestBed } from '@angular/core/testing';

import { RutaqueryService } from './rutaquery.service';

describe('RutaqueryService', () => {
  let service: RutaqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
