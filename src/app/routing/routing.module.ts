import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "../main/main.component";
import {LoginComponent} from "../main/login/login.component";
import {SignupComponent} from "../main/signup/signup.component";

const routes: Routes = [
  { path: "home", component: MainComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
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
