import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "../main/main.component";
import {LoginBottomSheetComponent} from "../main/login/login-bottom-sheet/login-bottom-sheet.component";
import {SignupBottomsheetComponent} from "../main/signup/signup-bottomsheet/signup-bottomsheet.component";
import {ExerciceComponent} from "../exercice/exercice.component";
import {ContactComponent} from "../contact/contact.component";
import {AboutusComponent} from "../aboutus/aboutus.component";
import {ExercicePlayComponent} from "../exercice/exercice-play/exercice-play.component";

const routes: Routes = [
  { path: "home", component: MainComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  { path: 'login', component: LoginBottomSheetComponent },
  { path: 'signup', component: SignupBottomsheetComponent },
  { path: 'workout', component: ExerciceComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path:'contact', component: ContactComponent },
  { path:'play', component: ExercicePlayComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
