import React, { useEffect, useState } from 'react'
import TransactionList from './TransactionList'
import { Box } from '@mui/material'
import { useQuery } from '@apollo/client';
import { PeriodEnum } from '../../types';
import { GET_USER_TRANSACTIONS } from '../../graphql/queries/transactionQueries';
import { useTransactionFilter } from '../../contexts/TransactionFilterContext';

interface PeriodTransactionsProps {
  period: PeriodEnum;
}

function calculateStartDate(period: PeriodEnum): Date {
  const startDate = new Date();

  switch (period) {
    case PeriodEnum.WEEK:
      startDate.setDate(startDate.getDate() - 7);
      break;
    case PeriodEnum.MONTH:
      startDate.setDate(startDate.getDate() - 30);
      break;
    case PeriodEnum.THREE_MONTHS:
      startDate.setDate(startDate.getDate() - 90);
      break;
    case PeriodEnum.LAST_YEAR:
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
  }

  return startDate;
}

const PeriodTransactions: React.FC<PeriodTransactionsProps> = ({ period }) => {
  const [startDate, setStartDate] = useState<string>("");
  const { types, sort, categories } = useTransactionFilter();

  useEffect(() => {
    setStartDate(calculateStartDate(period).toISOString());
  }, [period]);

  const filterType = types.length === 1 ? types[0] : null;

  const { data, loading, error } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { 
      startDate,
      categoryIds: categories.length ? categories : null,
      sortOrder: sort.toUpperCase(),
      type: filterType,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = data.getUserTransactions;

  return (
    <Box>
      <TransactionList transactions={transactions} isHomePage={false}/>
    </Box>
  )
}

export default PeriodTransactions;