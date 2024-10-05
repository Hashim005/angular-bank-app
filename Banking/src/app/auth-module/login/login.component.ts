import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      accountNumber: [],
      password: [''],
    });
  }

  onLogin(){
    const {accountNumber, password} = this.loginForm.value;
    this.authService.loginBankUser(accountNumber, password).subscribe(users =>{
      if(users.length>0){
        const user = users[0];
        this.authService.setCurrentUser(user);
      //  console.log("login successfull",user );

        this.router.navigate(['/dashboard/'])
      }
      else{
        this.errorMessage = 'Invalid account Number or password';
        this.authService.clearCurrentUser();
      }

    },
     error => {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login';
      this.authService.clearCurrentUser();
    })
  }



}
