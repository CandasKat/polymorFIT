import {Component, OnInit} from '@angular/core';
import {WorkoutService} from "../workout.service";
import {Exercice} from "../../model/exercice.model";
import {MatDialog} from "@angular/material/dialog";
import {ExerciceSummaryDialogComponent} from "../exercice-summary-dialog/exercice-summary-dialog.component";
import {Router} from "@angular/router";

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

  constructor(private workoutService: WorkoutService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.workoutService.exercisePlaylist$.subscribe((exercice) => {
      this.exercicesList = exercice;
      this.currentExercise = this.exercicesList[this.currentIndex];
    })
  }

  nextExercise() {
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
    this.intervalId = setInterval(() => {
      this.elapsedTime++;
      this.totalElapsedTime++;
    }, 1000);
  }

  pauseExercise() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
  }


  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  showSummary() {
    const dialogRef = this.dialog.open(ExerciceSummaryDialogComponent, {
      data: {
        totalTime: this.totalElapsedTime,
        exercises: this.exercicesList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User has confirmed the summary, navigate back to workout page.
        // Use the router service to navigate.
        this.router.navigate(['/workout']);
      }
    });
  }

}
