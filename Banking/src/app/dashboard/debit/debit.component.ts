import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Transaction } from '../../interface/transaction';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrl: './debit.component.css'
})
export class DebitComponent {
  debitForm!:FormGroup
  sidebarOpen = false;
  active = 1

  constructor(private transactionService:AuthService, private router:Router, private fb:FormBuilder){
    this.debitForm = this.fb.group({
      accountNumber:[null,[Validators.required]],
      debitAmount:[null, [Validators.required,Validators.min(1)]]
    });

  }

  onSubmit():void{
    if (this.debitForm.valid) {
      const { accountNumber, debitAmount } = this.debitForm.value;

      this.transactionService.updateBalance(accountNumber, -debitAmount).subscribe({
        next: () => {
          const transaction: Transaction = {
            accountNumber,
            amount: debitAmount,
            type: 'debit',
            date: new Date()
          };
          this.transactionService.recordTransaction(transaction).subscribe({
            next: () => {
              alert('Balance updated and transaction recorded successfully.');
              // console.log("debited");

              this.debitForm.reset();
            },
            error: (err) => {
              console.error('Error recording transaction:', err);
              alert('Failed to record transaction.');
            }
          });
        },
        error: (err) => {
          console.error('Error updating balance:', err);
          alert('Failed to update balance.');
        }
      });
    }
  }


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar's state
  }
  logout(){}

}
