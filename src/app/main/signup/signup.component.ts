import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SignupService} from "./signup.service";
import {passwordMatchValidator} from "./validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: passwordMatchValidator });
  isDisabled(): boolean {
    return (!this.signupForm.valid || this.signupForm.errors?.['passwordsDoNotMatch']);
  }

  hide: boolean = true;
  hideConfirm: boolean = true;
  @Output() close = new EventEmitter();
  constructor(private router: Router, private signup: SignupService) {}
  cancel() {
    this.router.navigate(['/home']);
  }
  getErrorMessage() {
    const emailControl = this.signupForm.get('mail');

    if (emailControl?.hasError('required')) {
      return 'You must enter a value';
    }

    return emailControl?.hasError('mail') ? 'Not a valid email' : '';
  }

  getFormControl(controlName: string): FormControl {
    return this.signupForm.get(controlName) as FormControl;
  }
  onSubmit(): void {
    this.signup.signup(
    this.signupForm.get('mail')?.value || '',
    this.signupForm.get('password')?.value || '',
    this.signupForm.get('first_name')?.value || '',
    this.signupForm.get('last_name')?.value || '',
    null
  ).subscribe(result => {
        if (result) {
          console.log('Connection réussi');
          this.router.navigate(["/home"]);
        } else {
          // Handle failed signup
        }
      },
      error => {
        console.error('Error:', error);
      });
  }


  protected readonly FormControl = FormControl;
}
