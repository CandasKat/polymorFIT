import { Component, OnInit } from '@angular/core';
import { WorkoutService } from "./workout.service";
import { AuthService } from "../main/auth.service";
import { Exercice } from "../model/exercice.model";
import { Router } from "@angular/router";



@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})

export class ExerciceComponent implements OnInit{
  userLevel =  this.authService.getCurrentUser()?.profile?.level;
  exercicesProgramList : Exercice[] = []
  exercicesList: Exercice[]  = []
  userDifficultyLevel: string | undefined;
  selectedExerciseType: string | undefined;

  isSearchOpen: boolean = false;
  searchQuery: string = '';
  selectedExercise: Exercice | undefined;

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.userDifficultyLevel = this.authService.getCurrentUser()?.profile?.level;
    // download all exercices database
    // this.downloadJsonData()

    // create an exercices data by equipment
    // this.getExercicesWithNoEquipement()

  }

  handleExerciseClick(exercise: Exercice): void {
    this.selectedExercise = exercise;
  }

  closeExerciseCard(): void {
    this.selectedExercise = undefined;
  }

  // hides the filter list
  showFilterList: boolean = false;
  filterTimeout: any;


  toggleFilterList(): void {
    clearTimeout(this.filterTimeout);
    this.showFilterList = !this.showFilterList;
    if (this.showFilterList) {
      this.filterTimeout = setTimeout(() => {
        this.showFilterList = false;
      }, 2000);
    }
  }

  typeExercices = [
    {value: "cardio", viewValue: "Cardio"},
    {value: "back", viewValue: "Back"},
    {value: "chest", viewValue: "Chest"},
    {value: "lower arms", viewValue: "Lower arms"},
    {value: "lower legs", viewValue: "Lower legs"},
    {value: "neck", viewValue: "Neck"},
    {value: "shoulders", viewValue: "Shoulders"},
    {value: "upper arms", viewValue: "Upper arms"},
    {value: "upper legs", viewValue: "Upper legs"},
    {value: "waist", viewValue: "Waist"}
  ];

  toggleSearch(): void {
    clearTimeout(this.searchTimeout);
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
        this.searchTimeout = setTimeout(() => {
          this.isSearchOpen = false;
          this.showFilterList = false;
        }, 5000);
      });
    }
  }

  searchTimeout: any;

  closeSearch(): void {
    clearTimeout(this.searchTimeout);
    this.isSearchOpen = false;
    this.showFilterList = false;
  }

  getExercicesListbyType(){
    // Clear the previous list
    this.exercicesProgramList = [];

    for (let t of this.typeExercices) {
      this.workoutService.getExercicesbyType(this.userLevel, t.value).subscribe((exercices) => {
        if (exercices) {
          // @ts-ignore
          this.exercicesProgramList = exercices
          console.log(exercices)
        } else {
          console.log(false)
        }
      })
    }
  }
downloadJsonData() {
    this.workoutService.getExercicesDB().subscribe((data) => {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  }


  getExercicesWithNoEquipement(exType: string | any){
    this.selectedExerciseType = exType;
    this.selectedExerciseType = 'exTime';
    this.workoutService.readExerciceDB().subscribe((exercice) => {
      this.exercicesList = [];
      // @ts-ignore

      for (let ex of exercice){
        if (ex.bodyPart === exType) { // @ts-ignore

          this.exercicesList.push(ex);
        }
      }
      for (let i = this.exercicesList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.exercicesList[i], this.exercicesList[j]] = [this.exercicesList[j], this.exercicesList[i]];
        }

       this.showFilterList = false;

      if (this.userDifficultyLevel === "beginner"){
        const repetition = 8;
        const time = 30;
        const exerciceSum = 10;
        this.exercicesList = this.exercicesList.slice(0, exerciceSum);
        for (let exr of this.exercicesList){
          exr.repetition = repetition;
          exr.time = time;
        }
        this.workoutService.setExercisePlaylist(this.exercicesList);
        console.log(this.exercicesList);

      }
      else if (this.userDifficultyLevel === "intermediate"){
        const repetition = 10;
        const time = 45;
        const exerciceSum = 15;
        this.exercicesList = this.exercicesList.slice(0, exerciceSum);
        for (let exr of this.exercicesList){
          exr.repetition = repetition;
          exr.time = time;
        }
        this.workoutService.setExercisePlaylist(this.exercicesList);

        console.log(this.exercicesList)

      }
      else if (this.userDifficultyLevel === "experimented"){
        const repetition = 12;
        const time = 60;
        const exerciceSum = 20;
        this.exercicesList = this.exercicesList.slice(0, exerciceSum);
        for (let exr of this.exercicesList){
          exr.repetition = repetition;
          exr.time= time;
        }
        this.workoutService.setExercisePlaylist(this.exercicesList);
        console.log(this.exercicesList);
      }



    //   const blob = new Blob([JSON.stringify(this.exercicesList)], { type: 'application/json' });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'data.json';
    //   a.click();
    //   URL.revokeObjectURL(url);
    //
    //   console.log(this.exercicesList)

    });
  }

  startExercice(){
    this.router.navigate(['/play']);
  }
}

