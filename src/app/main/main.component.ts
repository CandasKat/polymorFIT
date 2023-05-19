import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MainBottomSheetComponent} from "./main-bottom-sheet/main-bottom-sheet.component";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements AfterViewInit, OnDestroy{
   isLoggedIn: boolean = false;
   // @ts-ignore
  private isLoggedInSubscription: Subscription;
  constructor(private bottomSheet: MatBottomSheet, public authService: AuthService) {
  }

  customOptions: OwlOptions = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    items:1,
  }
  MyWeekOptions: OwlOptions = {
    stagePadding: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:10,
    navSpeed: 600,
  }


  async ngAfterViewInit() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn

    if (this.isLoggedIn){
      this.bottomSheet.dismiss();
      this.authService.checkUserProfile();
    }
    else {
      this.showBottomSheet()
    }});
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
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
