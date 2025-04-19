import { TestBed } from '@angular/core/testing';

import { ApiProcessService } from './api-process.service';

describe('ApiProcessService', () => {
  let service: ApiProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
