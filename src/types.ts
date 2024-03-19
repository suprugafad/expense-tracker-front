export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSES = 'EXPENSES',
}

export enum PeriodEnum {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  LAST_YEAR = 'LAST_YEAR'
}

interface CategoryInTransaction {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: CategoryInTransaction;
  description?: string;
  amount: number;
  time: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}
