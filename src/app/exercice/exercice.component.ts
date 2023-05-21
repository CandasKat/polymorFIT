import { Component, OnInit } from '@angular/core';
import { WorkoutService } from "./workout.service";
import { AuthService } from "../main/auth.service";
import { Exercice } from "../model/exercice.model";
import { Router } from "@angular/router";


@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss'],
})

export class ExerciceComponent implements OnInit{
  userLevel =  this.authService.getCurrentUser()?.profile?.level;
  exercicesProgramList : Exercice[] = []
  exercicesList: Exercice[]  = []
  userDifficultyLevel: string | undefined;
  selectedExerciseType: string | undefined;
  filteredExercises:any[] = [];
  noExercisesFound: boolean = false;

  isSearchOpen: boolean = false;
  searchQuery: string = '';
  selectedExercise: Exercice | undefined;
  svgIconPath = 'assets/media.svg';

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
    this.filteredExercises = this.typeExercices;
    this.setExerciseTimeBasedOnUserLevel();
  }

  filterExercises(): void {
    if (this.searchQuery) {
      // @ts-ignore
      this.filteredExercises = this.typeExercices.filter(exercise =>
        exercise.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.noExercisesFound = this.filteredExercises.length === 0;
    } else {
      this.filteredExercises = this.typeExercices;
      this.noExercisesFound = false;
    }
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
    {value: "cardio", viewValue: "Cardio", time: 0},
    {value: "back", viewValue: "Back", time: 0},
    {value: "chest", viewValue: "Chest", time: ""},
    {value: "lower arms", viewValue: "Lower arms", time: 0},
    {value: "lower legs", viewValue: "Lower legs", time: 0},
    {value: "neck", viewValue: "Neck", time: 0},
    {value: "shoulders", viewValue: "Shoulders", time: 0},
    {value: "upper arms", viewValue: "Upper arms", time: 0},
    {value: "upper legs", viewValue: "Upper legs", time: 0},
    {value: "waist", viewValue: "Waist", time: 0}
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
        },  10000);
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
      const time = "30";
      this.workoutService.getExercicesbyType(this.userLevel, t.value,time).subscribe((exercices) => {
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

  setExerciseTimeBasedOnUserLevel() {
    let time: number;
    switch (this.userDifficultyLevel) {
      case 'beginner':
        time = 30;
        break;
      case 'intermediate':
        time = 45;
        break;
      case 'experimented':
        time = 60;
        break;
      default:
        time = 0;
    }
    for (let typ of this.filteredExercises) {
      typ.time = time;
    }
  }

  getExercicesWithNoEquipement(exType: string | any){
    this.selectedExerciseType = exType;
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
          exr.time = time / exerciceSum;
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
          exr.time = time / exerciceSum;
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
          exr.time = time / exerciceSum;
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

