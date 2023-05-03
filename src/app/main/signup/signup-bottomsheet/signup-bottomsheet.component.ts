import {AfterViewInit, Component} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SignupComponent} from "../signup.component";

@Component({
  selector: 'app-signup-bottomsheet',
  templateUrl: './signup-bottomsheet.component.html',
  styleUrls: ['./signup-bottomsheet.component.scss']
})
export class SignupBottomsheetComponent implements AfterViewInit{

  constructor(private bottomSheet: MatBottomSheet) {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.bottomSheet.open(SignupComponent, { disableClose: true });
    });
  }
}
