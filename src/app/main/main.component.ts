import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MainBottomSheetComponent} from "./main-bottom-sheet/main-bottom-sheet.component";
import {AuthService} from "./auth.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit{
    isLoggedIn: boolean = false;
  constructor(private bottomSheet: MatBottomSheet, public authService: AuthService) {
  }
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn
    })
    if (this.isLoggedIn){
      this.bottomSheet.dismiss();
      this.authService.checkUserProfile();
    }
    else {
      this.showBottomSheet()
    }
  }

  showBottomSheet(){
    this.bottomSheet.open(MainBottomSheetComponent,
    {
      panelClass: 'custom-bottom-sheet',
      hasBackdrop: false,
      backdropClass: 'backdrop-custom',
      disableClose: true
    });
}

}
