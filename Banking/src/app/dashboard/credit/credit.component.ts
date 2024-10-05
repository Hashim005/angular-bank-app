import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Transaction } from '../../interface/transaction';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
})
export class CreditComponent {
  creditForm!:FormGroup
  sidebarOpen = false;
  active = 1

  constructor(private transactionService:AuthService, private router:Router, private fb:FormBuilder){
    this.creditForm = this.fb.group({
      accountNumber: [null, [Validators.required]],
      creditAmount: [null, [Validators.required, Validators.min(1)]]
    })
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar's state
  }
  
  onSubmit():void{
    if(this.creditForm.valid){
      const {accountNumber, creditAmount} = this.creditForm.value;
      this.transactionService.updateBalance(accountNumber, creditAmount).subscribe({next:()=>{
        const transaction:Transaction = {
            accountNumber,
            amount: creditAmount,
            type: 'credit',
            date: new Date()

        };
        this.transactionService.recordTransaction(transaction).subscribe({next:()=>{
          alert('Balance updated and transaction recorded successfully.');
          this.creditForm.reset();

        },
        error: (err) => {
          // console.error('Error recording transaction:', err);
          alert('Failed to record transaction.');
        }
      });
      },
    error: (err) => {
      // console.error('Error updating balance:', err);
      alert('Failed to update balance.');
    }
  });
}

}
}
