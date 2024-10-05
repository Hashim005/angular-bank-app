import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditComponent } from './credit.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Transaction } from '../../interface/transaction';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreditComponent', () => {
  let component: CreditComponent;
  let fixture: ComponentFixture<CreditComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['updateBalance', 'recordTransaction']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [CreditComponent],
      imports: [ReactiveFormsModule,RouterTestingModule], // Import ReactiveFormsModule for form-related functionality
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    formBuilder = TestBed.inject(FormBuilder);

    component.creditForm = formBuilder.group({
      accountNumber: [123456, [/* Validators here */]],
      creditAmount: [100, [/* Validators here */]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form successfully and record transaction' ,()=>{
    const mockTransaction: Transaction = {
      accountNumber: 123456,
      amount: 100,
      type: 'credit',
      date: new Date()
    };
    authService.updateBalance.and.returnValue(of(undefined));
    authService.recordTransaction.and.returnValue(of(mockTransaction));

    component.creditForm.setValue({
      accountNumber: 123456,
      creditAmount: 100
    });

    // component for submission
    component.onSubmit();


    expect(authService.updateBalance).toHaveBeenCalledWith(123456, 100);
    expect(authService.recordTransaction).toHaveBeenCalledWith(mockTransaction);


  })

  it('should handle balance update failure', () => {
    authService.updateBalance.and.returnValue(throwError(() => new Error('Balance update failed')));
    component.onSubmit();
    expect(authService.updateBalance).toHaveBeenCalledWith(123456, 100);
    expect(authService.recordTransaction).not.toHaveBeenCalled();

  })
  it('should handle transaction recording failure', () => {
    authService.updateBalance.and.returnValue(of(undefined));;
    authService.recordTransaction.and.returnValue(throwError(() => new Error('Transaction recording failed')));
    component.onSubmit();
    expect(authService.updateBalance).toHaveBeenCalledWith(123456, 100);
    expect(authService.recordTransaction).toHaveBeenCalled();
  })
});
