import { Component } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {exerciceComponent} from "./exercice/exercice.component";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'transform': 'translate3d(0, 0, 0)',
        'visibility': 'visible'
      })),
      state('out', style({
        'transform': 'translate3d(100%, 0, 0)',
        'visibility': 'hidden'
      })),
      transition('in => out', animate('400ms ease-out')),
      transition('out => in', animate('400ms ease-in'))
    ])
  ]
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
