import {Component, OnInit} from '@angular/core';
import {AuthService} from "../main/auth.service";
import {Weight} from "../model/user.model";
import {DayData} from "../model/exercice.model";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  currentUser: any;
  userWorkouts: any;
  totalWorkouts: number | undefined;
  totalDuration = 0;
  currentWeight: number | undefined;
  pastWeight: number | undefined;
  userWeights: Weight[] | any;
  lastSevenDays: DayData[] = [];
  calorieBurned = 0;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
      if (currentUser) {
        this.userWeights = this.currentUser.profile?.weights;
        if (this.userWeights && this.userWeights.length >= 2) {
          this.pastWeight = this.userWeights[this.userWeights.length - 2].value;
          this.currentWeight = this.userWeights[this.userWeights.length - 1].value;
        }
        else {
          this.currentWeight = this.userWeights.value
        }

        let currentDate = new Date();
        for (let i = 0; i < 7; i++) {
          let date = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
          // @ts-ignore
          this.lastSevenDays.push({
            date: date.toISOString().split('T')[0],
            exerciseTime: 0,
            isExercised: false
          });
        }

        this.getUserWorkouts();
      }
    });
  }

  getUserWorkouts() {
    this.authService.getWorkoutData(this.currentUser.id).subscribe(
      data => {
        this.userWorkouts = data;
        // @ts-ignore
        this.totalWorkouts = data.length;


        // @ts-ignore
        for (let exercise of data){
          this.totalDuration += exercise.duration;
          this.calorieBurned += exercise.caloriesBurned;
          let exerciseDate = new Date(exercise.startTime).toISOString().split('T')[0];
          for (let day of this.lastSevenDays) {
            // @ts-ignore
            if (day.date === exerciseDate) {
              // @ts-ignore
              day.exerciseTime += (exercise.duration / 60);
              // @ts-ignore
              day.isExercised = true;
            }
          }
        }
        this.totalDuration = this.totalDuration / 60;


        console.log(this.userWorkouts);
      },
      error => console.error(error)
    );
  }

  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
