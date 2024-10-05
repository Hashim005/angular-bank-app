import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['checkUserExist', 'registerBankUserDetails']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule,MatIconModule],
      providers: [FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass when passwords match and length is valid', () => {
    const formGroup:FormGroup = formBuilder.group({
      password: ['validPassword', Validators.required],
      confirmPassword: ['validPassword', Validators.required]
    })
    const ValidationErrors = component.passwordChecker()(formGroup);
    expect(ValidationErrors).toBeNull();
  })

  it('should return an error when password do not match',() => {
    const formGroup:FormGroup = formBuilder.group({
      password: ['validPassword', Validators.required],
      confirmPassword: ['differentPassword', Validators.required]
    })

    const validationErrors = component.passwordChecker()(formGroup);
    expect(validationErrors).toEqual({passwordMissMatch: true})

  });
  it('should return an error when password length is less than 5 characters', () => {
    const  formGroup:FormGroup = formBuilder.group({
      password:['1234',Validators.required],
      confirmPassword:['1234', Validators.required]
    })

    const validationErrors = component.passwordChecker()(formGroup);
    expect(validationErrors).toEqual({PassWordLengthIssue:true});

  });

  it('should return both errors when passwords do not match and length is less than 5 characters', () => {
    const formGroup: FormGroup = formBuilder.group({
      password: ['1234', Validators.required], // Less than 5 characters
      confirmPassword: ['differentPassword', Validators.required]
    });

    const validationErrors = component.passwordChecker()(formGroup);

    expect(validationErrors).toEqual({
      PassWordLengthIssue: true,
      passwordMissMatch: true
    });
  });

  it('should not be proceed if the form is invalid', () => {
    component.bankRegisterUserForm.setValue({
      accountNumber:'',
      name:'',
      password:'',
      confirmPassword:'',

    })
    authService.checkUserExist.and.returnValue(of(true));
    component.onSubmit();
    expect(authService.checkUserExist).not.toHaveBeenCalled();
    expect(authService.registerBankUserDetails).not.toHaveBeenCalled()

  });

  it('should register user if user does not exist navigate to login page', () => {
    spyOn(window,'alert')
    component.bankRegisterUserForm.setValue({
      accountNumber:'12345678901',
      name:'JohnDoe',
      password:'password123',
      confirmPassword:'password123',
      
    })

    authService.checkUserExist.and.returnValue(of(false));

    const mockUser = {
      accountNumber: 12345678901,
      name: 'JohnDoe',
      password: 'password123',
      token:'mock-token'

    };
    authService.registerBankUserDetails.and.returnValue((of(mockUser)));
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(window.alert).toHaveBeenCalled()




  })


});
