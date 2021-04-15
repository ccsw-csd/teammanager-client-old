import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCentrosFestivosComponent } from './listado-centros-festivos.component';

describe('ListadoCentrosFestivosComponent', () => {
  let component: ListadoCentrosFestivosComponent;
  let fixture: ComponentFixture<ListadoCentrosFestivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCentrosFestivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCentrosFestivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
