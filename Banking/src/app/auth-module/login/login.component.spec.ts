import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['loginBankUser', 'setCurrentUser', 'clearCurrentUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to dashboard', () => {
    const mockUser = { accountNumber: 123456, name: 'John Doe', password: 'password', token: 'abc123' };
    authService.loginBankUser.and.returnValue(of([mockUser]))

    component.loginForm.setValue({
       accountNumber: '123456',
       password: 'password'
    })

    component.onLogin();
    expect(authService.loginBankUser).toHaveBeenCalledWith('123456', 'password');
    expect(authService.setCurrentUser).toHaveBeenCalledWith(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/']);

  });

  it('should handle API error during login', () => {
    // Mock the login API to return an error
    authService.loginBankUser.and.returnValue(throwError(() => new Error('API error')));

    // Set form values
    component.loginForm.setValue({
      accountNumber: '123456',
      password: 'password'
    });

    // Trigger the login method
    component.onLogin();

    // Check that loginBankUser was called with the correct arguments
    expect(authService.loginBankUser).toHaveBeenCalledWith('123456', 'password');

    // Ensure that the error message is set correctly
    expect(component.errorMessage).toBe('An error occurred during login');

    // No navigation should occur when there's an error
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
