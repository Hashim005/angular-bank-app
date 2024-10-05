import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitComponent } from './debit.component';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Transaction } from '../../interface/transaction';
import { RouterTestingModule } from '@angular/router/testing';

describe('DebitComponent', () => {
  let component: DebitComponent;
  let fixture: ComponentFixture<DebitComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let fb: FormBuilder;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['updateBalance', 'recordTransaction']);
    await TestBed.configureTestingModule({
      declarations: [DebitComponent],
      imports: [ReactiveFormsModule,RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call updateBalance and recordTransaction on form submit with valid data', () => {
    const mockTransaction: Transaction = {
      accountNumber: 12345,
      amount: 100,
      type: 'debit',
      date: new Date()
    };

    // Set valid form data
    component.debitForm.setValue({ accountNumber: 12345, debitAmount: 100 });

    // Mock the service methods
    authService.updateBalance.and.returnValue(of(void 0));  // Return Observable<void>
    authService.recordTransaction.and.returnValue(of(mockTransaction));  // Return Observable<Transaction>

    spyOn(window, 'alert');  // Spy on alert to confirm it's called

    // Call onSubmit
    component.onSubmit();


    expect(authService.updateBalance).toHaveBeenCalledWith(12345, -100);

    // Check if recordTransaction was called
    expect(authService.recordTransaction).toHaveBeenCalledWith({
      accountNumber: 12345,
      amount: 100,
      type: 'debit',
      date: jasmine.any(Date)
    });


    expect(component.debitForm.value).toEqual({ accountNumber: null, debitAmount: null });


    expect(window.alert).toHaveBeenCalledWith('Balance updated and transaction recorded successfully.');
  });


  it('should handle error from updateBalance and show alert', () => {
    component.debitForm.setValue({ accountNumber: 12345, debitAmount: 100 });

    authService.updateBalance.and.returnValue(throwError(() => new Error('Update balance failed')));

    spyOn(window, 'alert');

    component.onSubmit();

    expect(authService.updateBalance).toHaveBeenCalledWith(12345, -100);
    expect(authService.recordTransaction).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Failed to update balance.');
  });
});
