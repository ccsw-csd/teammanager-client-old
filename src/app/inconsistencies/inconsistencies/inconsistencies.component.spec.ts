import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconsistenciesComponent } from './inconsistencies.component';

describe('InconsistenciesComponent', () => {
  let component: InconsistenciesComponent;
  let fixture: ComponentFixture<InconsistenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InconsistenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InconsistenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
