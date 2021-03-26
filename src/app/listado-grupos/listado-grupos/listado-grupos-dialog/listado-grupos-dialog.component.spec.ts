import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGruposDialogComponent } from './listado-grupos-dialog.component';

describe('ListadoGruposDialogComponent', () => {
  let component: ListadoGruposDialogComponent;
  let fixture: ComponentFixture<ListadoGruposDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGruposDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoGruposDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
