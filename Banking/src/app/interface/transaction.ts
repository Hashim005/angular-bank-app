export interface Transaction {
  id?:string,
  accountNumber: number;
  amount: number;
  type: 'credit' | 'debit';
  date: Date;
}
