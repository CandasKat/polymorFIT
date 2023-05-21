import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTargetModalComponent } from './exercise-target-modal.component';

describe('ExerciseTargetModalComponent', () => {
  let component: ExerciseTargetModalComponent;
  let fixture: ComponentFixture<ExerciseTargetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseTargetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseTargetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
