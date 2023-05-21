import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MainBottomSheetComponent} from "./main-bottom-sheet/main-bottom-sheet.component";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ExerciseTargetModalComponent} from "../exercice/exercise-target-modal/exercise-target-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {UserProfile} from "../model/user.model";
import {DayData} from "../model/exercice.model";
import {Container} from "tsparticles-engine";
import {loadFull} from "tsparticles";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements AfterViewInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUser:any;
  // @ts-ignore
  private isLoggedInSubscription: Subscription;

  workoutList: any[] = [];
  weekList: any[] = [];
  lastSevenDays: DayData[] = [];
  constructor(private bottomSheet: MatBottomSheet, public authService: AuthService, public dialog: MatDialog) {
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
        let currentDate = new Date();
        for (let i = 0; i < 7; i++) {
          let date = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
          // @ts-ignore
          this.lastSevenDays.push({
            date: date.toISOString().split('T')[0],
            isExercised: false
          });
        }
        this.currentUser = this.authService.getCurrentUser();
        this.authService.getWorkoutData(this.currentUser.id).subscribe((res) => {
          // @ts-ignore
          for (let exercise of res){
            let exerciseDate = new Date(exercise.startTime).toISOString().split('T')[0];
            for (let day of this.lastSevenDays) {
              // @ts-ignore
              if (day.date === exerciseDate) {
                day.startTime = exercise.startTime;
                day.endTime = exercise.endTime;
                // @ts-ignore
                day.isExercised = true;
              }
            }
          }

        })


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

  checkGoalAchievement(): boolean {
    let exercisedDays = this.lastSevenDays.filter(day => day.isExercised).length;
    let exerciseTarget = this.currentUser?.profile?.exerciseTarget;
    return exercisedDays >= exerciseTarget;
  }

  setExerciseTarget(): void {
    const currentUser = this.authService.getCurrentUser();

    const dialogRef = this.dialog.open(ExerciseTargetModalComponent, {
      width: '350px',
      data: {exerciseTarget: currentUser?.profile?.exerciseTarget}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result && currentUser) {
        const updatedProfile: Partial<UserProfile> = {exerciseTarget: result};
        this.authService.updateUserProfile(currentUser.id, updatedProfile).subscribe();
      }
    });
  }

  options = {
    background: {
      color: "rgba(0,0,0,0)"

    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'window' as const,
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outMode: 'bounce' as const,
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'confetti',
        options: {
          confetti: {
            type: ["circle", "square"]
          }
        }
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  // @ts-ignore
  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);


    await loadFull(engine);
  }
  particlesLoaded(container: Container): void {
    console.log(container);
  }



  protected readonly parseFloat = parseFloat;
}
