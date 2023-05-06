import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SignupService} from "./signup.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  mail = "";
  password = "";
  first_name = "";
  last_name = "";

  email = new FormControl('', [Validators.required, Validators.email]);
  hide: boolean = true;
  passwordFormControl = new FormControl('', [Validators.required, Validators.required]);
  @Output() close = new EventEmitter();
  constructor(private router: Router, private signup: SignupService) {}
  cancel() {
    this.router.navigate(['/home']);
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(): void {
    this.signup.signup(this.mail, this.password, this.first_name, this.last_name)
      .subscribe(result => {
    if (result) {

      console.log('Connection réussi');

      } else {


      }
    } ,
    error => {
      console.error('Error:', error);
    });
  }

}
