import { useQuery } from '@apollo/client';
import { GET_USER_TRANSACTIONS } from '../graphql/queries/transactionQueries';

export function useTransactionsQuery(startDate: string, filterType: any, categories: string[], sort: string, transactionsPerLoad: number) {
  return useQuery(GET_USER_TRANSACTIONS, {
    variables: { 
      startDate,
      categoryIds: categories.length ? categories : null,
      sortOrder: sort.toUpperCase(),
      type: filterType,
      skip: 0,
      limit: transactionsPerLoad,
    },
  });
}