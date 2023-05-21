import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ExerciseTargetDialogData {
  exerciseTarget: number;
}

@Component({
  selector: 'app-exercise-target-modal',
  templateUrl: './exercise-target-modal.component.html',
  styleUrls: ['./exercise-target-modal.component.scss']
})
export class ExerciseTargetModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ExerciseTargetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExerciseTargetDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
