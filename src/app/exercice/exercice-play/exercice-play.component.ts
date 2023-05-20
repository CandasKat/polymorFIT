import {Component, OnInit} from '@angular/core';
import {WorkoutService} from "../workout.service";
import {Exercice, Workouts} from "../../model/exercice.model";
import {MatDialog} from "@angular/material/dialog";
import {ExerciceSummaryDialogComponent} from "../exercice-summary-dialog/exercice-summary-dialog.component";
import {Router} from "@angular/router";
import {AuthService} from "../../main/auth.service";

@Component({
  selector: 'app-exercice-play',
  templateUrl: './exercice-play.component.html',
  styleUrls: ['./exercice-play.component.scss']
})
export class ExercicePlayComponent implements OnInit{
  // @ts-ignore
  exercicesList: Exercice[];
  currentIndex = 0;
  // @ts-ignore
  currentExercise: Exercice;
  elapsedTime: number = 0;
  totalElapsedTime: number = 0;
  intervalId: any = null;
  isPlaying: boolean = false;
  currentUser: any;
  currentWorkout: Workouts | any;
  totalCaloriesBurned = 0;


  constructor(
    private workoutService: WorkoutService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.workoutService.exercisePlaylist$.subscribe((exercice) => {
      this.exercicesList = exercice;
      this.currentExercise = this.exercicesList[this.currentIndex];
    })
  }

  nextExercise() {
    this.pauseExercise();
    if (this.currentIndex < this.exercicesList.length - 1) {
      this.currentIndex++;
      this.currentExercise = this.exercicesList[this.currentIndex];
      this.elapsedTime = 0;


    }
    else {
      this.showSummary();
  }
  }

  previousExercise() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentExercise = this.exercicesList[this.currentIndex];
      this.elapsedTime = 0;

    }
  }

  playExercise() {
    this.isPlaying = true;
    this.currentWorkout = {
      userId: this.currentUser.id,
      exerciceId: this.currentExercise.id,
      startTime: new Date().toISOString(),
      duration: 0,
      id: Date.now(),
      caloriesBurned: 0
    };
    this.intervalId = setInterval(() => {
      this.elapsedTime++;
      this.totalElapsedTime++;
    }, 1000);
  }

  pauseExercise() {
    this.isPlaying = false;
    const endTime = new Date();
    // @ts-ignore
    this.currentWorkout.endTime = endTime.toISOString();
    // @ts-ignore
    this.currentWorkout.duration = this.elapsedTime;
    // @ts-ignore
    this.currentWorkout.caloriesBurned = this.calculateCaloriesBurned(this.elapsedTime);
    // @ts-ignore
    this.totalCaloriesBurned += this.calculateCaloriesBurned(this.currentExercise.bodyPart, this.elapsedTime);

    clearInterval(this.intervalId);
  }




  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  showSummary() {


    const dialogRef = this.dialog.open(ExerciceSummaryDialogComponent, {
      width: '250px',
      data: {
        totalDuration: this.totalElapsedTime,
        workouts: this.exercicesList,
        totalCaloriesBurned: this.totalCaloriesBurned
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/workout']);

        // Save workout data
        const workoutData = {
          userId: this.currentUser.id,
          startTime: this.currentWorkout.startTime,
          endTime: this.currentWorkout.endTime,
          exerciceId: this.currentWorkout.exerciceId,
          duration: this.totalElapsedTime,
          caloriesBurned: this.totalCaloriesBurned
        };

        // @ts-ignore
        this.authService.saveWorkoutData(workoutData).subscribe(
          // @ts-ignore

          response => console.log(response),
          // @ts-ignore

          error => console.error(error)
        );
      }
    });
  }

  calculateCaloriesBurned(workout: string, duration: number): number {
    const exerciseCalorieRates = {
      "cardio": 10,
      "back": 7,
      "chest": 7,
      "lower arms": 5,
      "lower legs": 8,
      "neck": 4,
      "shoulders": 7,
      "upper arms": 5,
      "upper legs": 8,
      "waist": 6
    };
    // @ts-ignore
    const calorieRate = exerciseCalorieRates[workout.bodyPart] || 5;
    const level = this.authService.getCurrentUser()?.profile?.level;
    let difficulty = 0;
    switch (level){
      case "beginner":
        difficulty = 1.1;
        break;
      case "intermediate":
        difficulty = 1.2;
        break;
      case "experimented":
        difficulty = 1.3;
        break;
    }

    return calorieRate * duration / 10 * difficulty;
  }

  goBack() {
    this.router.navigate(['/workout']);
  }
}



