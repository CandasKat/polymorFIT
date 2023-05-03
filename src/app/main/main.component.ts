import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MainBottomSheetComponent} from "./main-bottom-sheet/main-bottom-sheet.component";
import {Subscriber} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit{
constructor(private bottomSheet: MatBottomSheet) {
}
ngOnInit() {
  this.showBottomSheet()
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
