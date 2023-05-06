import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from "../../../model/user.model";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent {
  levelForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.levelForm = this.formBuilder.group({
      level: ["", Validators.required]
    });
  }
  onSubmit() {
    const update: Partial<UserProfile> = {
      level: this.levelForm.get('level')?.value,
    };

    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.authService.updateUserProfile(currentUser.id, update).subscribe(
        () => {
          this.authService.bottomSheet.dismiss();
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.error('No current user found');
    }
  }


}
