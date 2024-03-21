import React, { createContext, useContext } from 'react';
import { TransactionType } from '../types';

type SortValue = 'highest' | 'lowest' | 'newest' | 'oldest';
type CategoriesValue = string[];

interface TransactionFilterContextValue {
  types: TransactionType[];
  sort: SortValue;
  categories: CategoriesValue;
  setTypes: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  setSort: React.Dispatch<React.SetStateAction<SortValue>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoriesValue>>;
}

export const TransactionFilterContext = createContext<TransactionFilterContextValue | undefined>(undefined);

export const useTransactionFilter = () => {
  const context = useContext(TransactionFilterContext);
  if (!context) {
    throw new Error('useTransactionFilter must be used within a TransactionFilterProvider');
  }
  return context;
};

