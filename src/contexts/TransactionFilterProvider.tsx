import React, { ReactNode } from 'react';
import { useState } from 'react';
import { TransactionType } from '../types';
import { TransactionFilterContext } from './TransactionFilterContext';

type SortValue = 'highest' | 'lowest' | 'newest' | 'oldest';
type CategoriesValue = string[];

interface TransactionFilterProviderProps {
  children: ReactNode;
}

export const TransactionFilterProvider: React.FC<TransactionFilterProviderProps> = ({ children }) => {
  const [types, setTypes] = useState<TransactionType[]>([TransactionType.INCOME, TransactionType.EXPENSES]);
  const [sort, setSort] = useState<SortValue>('newest');
  const [categories, setCategories] = useState<CategoriesValue>([]);

  const value = { types, setTypes, sort, setSort, categories, setCategories };

  return (
    <TransactionFilterContext.Provider value={value}>
      {children}
    </TransactionFilterContext.Provider>
  );
};