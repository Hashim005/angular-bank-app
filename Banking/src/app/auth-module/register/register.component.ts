import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  bankRegisterUserForm!: FormGroup;
  hide: boolean = true;
  userExists: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bankRegisterUserForm = this.fb.group({
      accountNumber: [, [Validators.required,Validators.pattern(/^([0-9]{11})|([0-9]{2}-[0-9]{3}-[0-9]{6})$/)]],
      name: ['',[Validators.required, Validators.pattern("^[A-Za-z][A-Za-z0-9_]{4,29}$")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordChecker() // Apply custom validator at the form group level
    });
  }

  // Getter for form controls
  get form() {
    return this.bankRegisterUserForm.controls;
  }

  passwordChecker(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('confirmPassword');

      if (!passwordControl || !confirmPasswordControl) {
        return null; // Avoid issues if controls are not present
      }

      const errors: any = {};

      // Passwords don't match
      if (passwordControl.value !== confirmPasswordControl.value) {
        errors.passwordMissMatch = true;
      }

      // Password length check (at least 5 characters)
      if (passwordControl.value.length < 5) {
        errors.PassWordLengthIssue = true;
      }

      // Return null if no errors or the errors object if any error exists
      return Object.keys(errors).length ? errors : null;
    };
  }

  // Submit handler
  onSubmit(): void {
    if (this.bankRegisterUserForm.valid) {

      const accountNumber = this.bankRegisterUserForm.value.accountNumber

      //check if user is already exists
      this.authService.checkUserExist(accountNumber).subscribe(exists => {
        this.userExists = exists;

        if(this.userExists){
          alert('Account number already exists. Please use a different account number.')
        }
        else{
          // Proceed with registration if user doesn't exist
          const user = this.bankRegisterUserForm.value;
          this.authService.registerBankUserDetails(user).subscribe(
            result => {
              alert('Registration successful');
              this.router.navigate(['/auth/login']);
            },
            error => {
              alert('Registration failed');
            }
          );

        }
      })


    }
  }
  toggleHide() {
    this.hide = !this.hide;
  }
}
