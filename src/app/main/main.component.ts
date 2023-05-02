import { Component } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent {
constructor(private bottomSheet: MatBottomSheet) {
}
 // login form
  loginBottomSheet() {
    this.bottomSheet.open(LoginComponent);
  }

  // signup form
  signupBottomSheet() {
    this.bottomSheet.open(SignupComponent);
  }
}
