import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicePlayComponent } from './exercice-play.component';

describe('ExercicePlayComponent', () => {
  let component: ExercicePlayComponent;
  let fixture: ComponentFixture<ExercicePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicePlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
