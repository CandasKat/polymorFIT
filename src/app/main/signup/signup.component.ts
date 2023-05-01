import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide: boolean = true;
  passwordFormControl = new FormControl('', [Validators.required, Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}
