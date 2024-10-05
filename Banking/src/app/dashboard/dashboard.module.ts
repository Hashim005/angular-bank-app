import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreditComponent } from './credit/credit.component';
import { DebitComponent } from './debit/debit.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AutoFocusDirective } from '../directives/auto-focus.directive';
import { CurrencyFormatDirective } from '../directives/currency-format.directive';


@NgModule({
  declarations: [
    CreditComponent,
    DebitComponent,
    TransactionHistoryComponent,
    DashboardComponent,
    CurrencyFormatDirective

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DecimalPipe,
    NgbNavModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule
  ]
})
export class DashboardModule { }
