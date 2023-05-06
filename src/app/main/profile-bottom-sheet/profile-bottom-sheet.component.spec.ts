import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBottomSheetComponent } from './profile-bottom-sheet.component';

describe('ProfileBottomSheetComponent', () => {
  let component: ProfileBottomSheetComponent;
  let fixture: ComponentFixture<ProfileBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
