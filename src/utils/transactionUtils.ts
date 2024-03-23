import { format } from 'date-fns';
import { Transaction, TransactionType } from '../types';

export const getImage = (type: TransactionType): string => {
  return type === TransactionType.INCOME ? '/images/income.png' : '/images/expenses.png';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd MMM, HH:mm");
};

export interface GroupedTransactions {
  [key: string]: Transaction[];
}

export const groupTransactionsByDate = (transactions: Transaction[]): GroupedTransactions => {
  return transactions.reduce((groups: GroupedTransactions, transaction: Transaction) => {
    const date = formatDate(transaction.date).split(',')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};