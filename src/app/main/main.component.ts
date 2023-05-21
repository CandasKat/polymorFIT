import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MainBottomSheetComponent} from "./main-bottom-sheet/main-bottom-sheet.component";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements AfterViewInit, OnDestroy {
  isLoggedIn: boolean = false;
  // @ts-ignore
  private isLoggedInSubscription: Subscription;

  workoutList: any[] = [];
  weekList: any[] = [];

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
    items: 1,
  }
  MyWeekOptions: OwlOptions = {
    stagePadding: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 600,
  }

  ngOnInit() {
    this.workoutList = [
      {type: 'Cardio', time: '20 min'},
      {type: 'Back', time: '30 min'},
      {type: 'Chest', time: '40 min'},
      {type: 'Lower Arms', time: '25 min'},
      {type: 'Lower Legs', time: '35 min'},
      {type: 'Neck', time: '15 min'},
      {type: 'Shoulders', time: '30 min'},
      {type: 'Upper Arms', time: '25 min'},
      {type: 'Upper Legs', time: '40 min'},
      {type: 'Waist', time: '20 min'},
    ];

    this.weekList = [
      { day: 'Mon.', time: '07h00 - 07h30', workoutType: this.workoutList[9]?.type },
      { day: 'Tue.', time: '12h30 - 13h00', workoutType: this.workoutList[1]?.type },
      { day: 'Wed.', time: '18h00 - 18h30', workoutType: this.workoutList[0]?.type },
      { day: 'Thu.', time: '07h30 - 08h00', workoutType: this.workoutList[9]?.type },
      { day: 'Fri.', time: '12h00 - 12h30', workoutType: this.workoutList[1]?.type },
      { day: 'Sat.', time: '09h00 - 09h30', workoutType: this.workoutList[2]?.type },
      { day: 'Sun.', time: '16h00 - 16h30', workoutType: this.workoutList[0]?.type }
    ];

  }

  async ngAfterViewInit() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn

      if (this.isLoggedIn) {
        this.bottomSheet.dismiss();
        this.authService.checkUserProfile();
      } else {
        this.showBottomSheet()
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

  showBottomSheet() {
    this.bottomSheet.open(MainBottomSheetComponent,
      {
        panelClass: 'custom-bottom-sheet',
        hasBackdrop: false,
        backdropClass: 'backdrop-custom',
        disableClose: true
      });
  }

}
