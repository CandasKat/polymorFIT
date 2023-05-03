import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";
import {LoginBottomSheetComponent} from "../login/login-bottom-sheet/login-bottom-sheet.component";
import {SignupBottomsheetComponent} from "../signup/signup-bottomsheet/signup-bottomsheet.component";

@Component({
  selector: 'app-main-bottom-sheet',
  templateUrl: './main-bottom-sheet.component.html',
  styleUrls: ['./main-bottom-sheet.component.scss']
})
export class MainBottomSheetComponent {
  activeComponent = 'main';
  constructor(private mainBottomSheet: MatBottomSheet,  private router: Router) {}
  @ViewChild('bottomSheet', { static: true }) bottomSheet!: ElementRef;

  loginBottomSheet() {
    this.mainBottomSheet.dismiss();
    this.router.navigate(['/login']);
    this.mainBottomSheet.open(LoginBottomSheetComponent)
  }

  signupBottomSheet() {
    this.mainBottomSheet.dismiss();
    this.router.navigate(['/signup']);
    this.mainBottomSheet.open(SignupBottomsheetComponent)

  }

  closeComponent() {
    this.activeComponent = 'main';
  }
}
