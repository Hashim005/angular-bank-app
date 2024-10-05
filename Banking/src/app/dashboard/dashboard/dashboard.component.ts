import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Route, Router } from '@angular/router';
import { Transaction } from '../../interface/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  creditForm!:FormGroup
  sidebarOpen = false;
  active = 1

  constructor(private transactionService:AuthService, private router:Router, private fb:FormBuilder){

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar's state
  }
  logout():void{
    this.transactionService.logout();
    this.router.navigate(['/login']);
  }



}
