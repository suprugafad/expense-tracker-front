export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSES = 'EXPENSES',
}

interface CategoryInTransaction {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: CategoryInTransaction;
  description: string;
  amount: number;
  time: string;
}