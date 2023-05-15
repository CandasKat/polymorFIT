import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-exercice-summary-dialog',
  templateUrl: './exercice-summary-dialog.component.html',
  styleUrls: ['./exercice-summary-dialog.component.scss']
})
export class ExerciceSummaryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ExerciceSummaryDialogComponent>
  ) {}
}
