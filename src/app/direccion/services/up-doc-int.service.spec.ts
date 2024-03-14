import { TestBed } from '@angular/core/testing';

import { UpDocIntService } from './up-doc-int.service';

describe('UpDocIntService', () => {
  let service: UpDocIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpDocIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
