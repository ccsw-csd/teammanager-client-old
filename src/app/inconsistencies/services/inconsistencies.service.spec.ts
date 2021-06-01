import { TestBed } from '@angular/core/testing';

import { InconsistenciesService } from './inconsistencies.service';

describe('InconsistenciesService', () => {
  let service: InconsistenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InconsistenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
