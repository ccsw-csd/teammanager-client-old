import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDetailExportDialogComponent } from './forecast-detail-export-dialog.component';

describe('ForecastDetailExportDialogComponent', () => {
  let component: ForecastDetailExportDialogComponent;
  let fixture: ComponentFixture<ForecastDetailExportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastDetailExportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDetailExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
