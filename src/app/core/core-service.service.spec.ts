import { TestBed } from '@angular/core/testing';

import { CoreService } from './core-service.service';

describe('CoreServiceService', () => {
  let service: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
