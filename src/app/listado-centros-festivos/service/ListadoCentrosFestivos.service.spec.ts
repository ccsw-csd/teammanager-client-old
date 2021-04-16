import { TestBed } from '@angular/core/testing';

import { ListadoCentrosFestivosService } from './ListadoCentrosFestivos.service';

describe('ServiceService', () => {
  let service: ListadoCentrosFestivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoCentrosFestivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
