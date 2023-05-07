import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login-signup-buttons',
  templateUrl: './login-signup-buttons.component.html',
  styleUrls: ['./login-signup-buttons.component.scss']
})
export class LoginSignupButtonsComponent implements OnInit{
  @Input() button_name="";
  @Input() isDisabled = true;

  constructor(private socialAuthService: SocialAuthService,  private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.onSignIn(user);
        this.router.navigate(["/home"]);
      } else {
        this.authService.setLoggedInStatus(false);
        this.authService.setCurrentUser(null);
      }
    });
  }

  // @ts-ignore
  onSignIn(googleUser): void {
    const firstName = googleUser.firstName;
    const lastName = googleUser.lastName;
    const email = googleUser.email;
    const user = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      mail: email,
      profile: null,
    };

    this.authService.findUserByEmail(email).subscribe((existingUser) => {
      if (existingUser) {
        this.authService.setLoggedInStatus(true);
        // @ts-ignore
        this.authService.setCurrentUser({...user, profile: existingUser.profile});
        this.authService.checkUserProfile();
      } else {
        // @ts-ignore
        this.authService.registerGoogleUser(user).subscribe((registeredUser) => {
          if (registeredUser) {
            this.authService.setLoggedInStatus(true);
            // @ts-ignore
            this.authService.setCurrentUser({...user, id: registeredUser.id}); // <-- id değerini burada ayarlayın
            this.authService.checkUserProfile();
          } else {
            console.error("Error registering the Google user");
          }
        });
      }
    });
  }
}
