import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../main/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy{

  @Output() sidenavClose = new EventEmitter();
  isLoggedIn = false;
  // @ts-ignore
  private isLoggedInSubscription: Subscription;
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
}
