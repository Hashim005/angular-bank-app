import { Transaction } from './../../interface/transaction';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {
  displayedColumns:string[] = ['accountNumber','amount','type','date']
  dataSource = new MatTableDataSource<Transaction>([]);

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private transactionService:AuthService){}

  ngOnInit(): void {
    this.transactionService.getTransaction().subscribe((transactions:Transaction[]) => {
      this.dataSource.data = transactions;
      this.dataSource.paginator = this.paginator
    })
  }




}
