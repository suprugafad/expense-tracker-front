import React, { useEffect, useState } from 'react'
import TransactionList from './TransactionList'
import { Box, Button } from '@mui/material'
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
  const [transactions, setTransactions] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { types, sort, categories } = useTransactionFilter();
  const transactionsPerLoad = 15;

  useEffect(() => {
    setStartDate(calculateStartDate(period).toISOString());
  }, [period]);

  const filterType = types.length === 1 ? types[0] : null;

  const { loading, error, fetchMore } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { 
      startDate,
      categoryIds: categories.length ? categories : null,
      sortOrder: sort.toUpperCase(),
      type: filterType,
      skip: 0,
      limit: transactionsPerLoad,
    },
    onCompleted: data => {
      setTransactions(data.getUserTransactions);
      setHasMore(data.getUserTransactions.length === transactionsPerLoad);
    }
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        skip: transactions.length,
        limit: transactionsPerLoad,
      },
    }).then(fetchMoreResult => {
      const newTransactions = fetchMoreResult.data.getUserTransactions;
      setTransactions([...transactions, ...newTransactions]);
      setHasMore(newTransactions.length === transactionsPerLoad);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{paddingBottom: '90px'}}>
      <TransactionList transactions={transactions} isHomePage={false}/>
      {hasMore && (
        <Box sx={{textAlign: 'center'}}>
          <Button onClick={loadMore} disabled={loading} >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default PeriodTransactions;