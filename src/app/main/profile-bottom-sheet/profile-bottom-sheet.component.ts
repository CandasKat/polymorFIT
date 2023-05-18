import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UserProfile} from "../../model/user.model";
import {LevelComponent} from "./level/level.component";

@Component({
  selector: 'app-profile-bottom-sheet',
  templateUrl: './profile-bottom-sheet.component.html',
  styleUrls: ['./profile-bottom-sheet.component.scss']
})
export class ProfileBottomSheetComponent {
profileForm: FormGroup;
  sex = [
    {value: "woman", viewValue:"Woman"},
    {value:"man", viewValue: "Man"},
    {value:"other", viewValue: "Other"} ]
  constructor(private formBuilder: FormBuilder, public authService: AuthService) {
    const lastWeightRecord = this.getCurrentUserLastWeightRecord();
    this.profileForm = this.formBuilder.group({
      sex: ['', Validators.required],
      age: ['', Validators.required],
      weight: [lastWeightRecord.value, Validators.required],
      weightDate: [lastWeightRecord.date, Validators.required],
      height: ['', Validators.required],
    });
  }

  onSubmit() {
    const profile: UserProfile = {
      sex: this.profileForm.get('sex')?.value,
      age: this.profileForm.get('age')?.value,
      weights: {
        // @ts-ignore

        value: this.profileForm.get('weight')?.value,
        date: this.profileForm.get('weightDate')?.value,
      },
      height: this.profileForm.get('height')?.value,
    };

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.authService.updateUserProfile(currentUser.id, profile).subscribe((updatedProfile) => {
        console.log('Profile updated:', updatedProfile);
        this.authService.bottomSheet.dismiss();
        this.authService.bottomSheet.open(LevelComponent, {
        panelClass: 'custom-bottom-sheet',
        hasBackdrop: false,
        backdropClass: 'backdrop-custom',
        disableClose: true,
      });
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.error('No current user found');
    }
  }

  getCurrentUserLastWeightRecord() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.profile?.weights) {
      return currentUser.profile.weights[currentUser.profile.weights.length - 1];
    }
    return {value: '', date: new Date().toISOString().split('T')[0]};
  }


}

