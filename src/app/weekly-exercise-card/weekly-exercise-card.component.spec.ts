import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyExerciseCardComponent } from './weekly-exercise-card.component';

describe('WeeklyExerciseCardComponent', () => {
  let component: WeeklyExerciseCardComponent;
  let fixture: ComponentFixture<WeeklyExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyExerciseCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
