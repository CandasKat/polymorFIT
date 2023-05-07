import { AfterViewInit, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-login-bottom-sheet',
  templateUrl: './login-bottom-sheet.component.html',
  styleUrls: ['./login-bottom-sheet.component.scss'],
})
export class LoginBottomSheetComponent implements AfterViewInit {
  constructor(private bottomSheet: MatBottomSheet) {}

  async ngAfterViewInit() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.bottomSheet.open(LoginComponent, { disableClose: true });
  }
}
