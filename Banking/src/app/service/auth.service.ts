import { HttpClient } from '@angular/common/http';
import { BankUser } from './../interface/bank-user';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Transaction } from '../interface/transaction';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getLoginUserApiUrl = "http://localhost:3000/user";
  registerUserApiUrl = "http://localhost:3000/user/";
  checkUserExistApiUrl = "http://localhost:3000/user";

  transactionApiUrl = "http://localhost:3000/transaction"
  getTransactionApiUrl = "http://localhost:3000/transaction"







  registerBankUserDetails(userAdd:BankUser):Observable<BankUser>{
    return this.http.post<BankUser>(this.registerUserApiUrl, userAdd)

  }
  checkUserExist(accountNumber:number):Observable<boolean>{
    return this.http.get<BankUser[]>(this.checkUserExistApiUrl).pipe(map((users:BankUser[]) => users.some(user => user.accountNumber === accountNumber)))

  }

  loginBankUser(username:string, password:string):Observable<BankUser[]>{
   return  this.http.get<BankUser[]>(`${this.getLoginUserApiUrl}?username=${username}&password=${password}`)

  }
  setCurrentUser(user: BankUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Retrieve the current user from local storage
  getCurrentUser(): BankUser | null {
    const jsonUser = localStorage.getItem('currentUser');
    return jsonUser ? JSON.parse(jsonUser) : null;
  }

  getAuthToken(): string | null{
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.token : null

  }

  // Clear the current user from local storage
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  // Logout method
  logout(): void {
    this.clearCurrentUser();
  }

  updateBalance(accountNumber: number, amount: number): Observable<void> {
    return this.http.get<BankUser[]>(this.checkUserExistApiUrl).pipe(
      switchMap(users => {
        const user = users.find(user => user.accountNumber === accountNumber);
        if (user) {
          user.balance = user.balance || 0;
          user.balance += amount;

          // Update user on the server
          return this.http.put<void>(`${this.registerUserApiUrl}${user.id}`, user).pipe(
            catchError(error => {
              console.error('Balance update failed:', error);
              return throwError(() => new Error('Balance update failed.'));
            })
          );
        } else {
          // Throw an error if user not found
          return throwError(() => new Error('User not found.'));
        }
      })
    );
  }

  recordTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionApiUrl, transaction).pipe(
      catchError(error => {
        console.error('Transaction recording failed:', error);
        return throwError(() => new Error('Transaction recording failed.'));
      })
    );
  }

  getTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.getTransactionApiUrl)
  }

}
