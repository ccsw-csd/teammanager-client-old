import { TestBed } from '@angular/core/testing';

import { ListadoGruposService } from './listado-grupos.service';

describe('ListadoGruposService', () => {
  let service: ListadoGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
