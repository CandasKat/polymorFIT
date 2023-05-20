import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../main/auth.service";
import {UserProfile} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userProfileForm = this.formBuilder.group({});
  fileName: string = "";
  currentUserSymbol: string = '';
  currentUser: any;
  selectedImage: any = null;
  level = [
    {value: "beginner", viewValue:"Beginner"},
    {value:"intermediate", viewValue: "Intermediate"},
    {value:"experimented", viewValue: "Experimented"} ]

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
    this.selectedImage = this.currentUser?.profile?.image || null;
    this.currentUserSymbol = this.currentUser?.firstName.charAt(0);

    let weights = this.currentUser.profile.weights;
    if (this.currentUser.profile.weights && !Array.isArray(this.currentUser.profile.weights)) {
      this.currentUser.profile.weights = [this.currentUser.profile.weights];
    }

    let weightValue = weights && weights.length > 0 ? weights[weights.length - 1].value : weights.value;
      let weightDate = weights && weights.length > 0 ? weights[weights.length - 1].date : weights.date;
      // @ts-ignore
      this.userProfileForm = this.formBuilder.group({
        image: [this.currentUser.image],
        firstName: [this.currentUser.firstName, Validators.required],
        lastName: [this.currentUser.lastName, Validators.required],
        age: [this.currentUser.profile.age, Validators.required],
        weight: [weightValue, Validators.required],
        weightDate: [weightDate, Validators.required],
        height: [this.currentUser.profile.height, Validators.required],
        exerciceLevel: [this.currentUser.profile.level]
      });

    }




  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.preview(file);
      console.log(file)
      // @ts-ignore
      this.userProfileForm.get('image').setValue('/assets/' + file.name);
      this.fileName = file.name
    }
  }


  // @ts-ignore
  preview(file) {
  if (file.type.indexOf("image") == -1) {
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    this.selectedImage = reader.result;
    console.log(this.selectedImage)
  }
  console.log(reader)
}

  onSubmit() {
    const formValue: any = this.userProfileForm.value;

    const newWeightEntry = formValue.weight
      ? { value: formValue.weight, date: new Date().toISOString().split('T')[0] }
      : null;

    const update: Partial<UserProfile> = {
      // @ts-ignore
      image: formValue.image || this.currentUser.profile.image,
      // @ts-ignore
      age: formValue.age || this.currentUser.profile.age,
      // @ts-ignore
      weights: newWeightEntry ? [...this.currentUser.profile.weights, newWeightEntry] : this.currentUser.profile.weights,
      // @ts-ignore
      height: formValue.height || this.currentUser.profile.height,
      // @ts-ignore
      level: formValue.level || this.currentUser.profile.level,
    };

    this.authService.updateUserProfile(this.currentUser.id, update).subscribe((response) => {
      if(response){
        alert("Profile updated successfully");
      }
      else{
        alert("Profile update failed");
      }
    });
  }

  cancel(){
    alert("Profile update canceled");
    this.router.navigate(["/home"])
  }

}
