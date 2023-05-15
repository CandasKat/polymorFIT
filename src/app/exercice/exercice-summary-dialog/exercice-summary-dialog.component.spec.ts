import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceSummaryDialogComponent } from './exercice-summary-dialog.component';

describe('ExerciceSummaryDialogComponent', () => {
  let component: ExerciceSummaryDialogComponent;
  let fixture: ComponentFixture<ExerciceSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciceSummaryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciceSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
