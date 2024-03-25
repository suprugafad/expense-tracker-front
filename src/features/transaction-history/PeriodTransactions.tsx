import React, { useEffect, useState } from 'react'
import TransactionList from '../../components/common/TransactionList/TransactionList'
import { Box, Button } from '@mui/material'
import { PeriodEnum, Transaction } from '../../types';
import { useTransactionFilter } from '../../contexts/TransactionFilterContext';
import { calculateStartDate } from '../../utils/dateUtils';
import { useTransactionsQuery } from '../../services/transactionService';

interface PeriodTransactionsProps {
  period: PeriodEnum;
}

const PeriodTransactions: React.FC<PeriodTransactionsProps> = ({ period }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { types, sort, categories } = useTransactionFilter();

  useEffect(() => {
    setStartDate(calculateStartDate(period).toISOString());
  }, [period]);

  const filterType = types.length === 1 ? types[0] : null;
  const transactionsPerLoad = 15;

  const { data, loading, error, fetchMore } = useTransactionsQuery(startDate, filterType, categories, sort, transactionsPerLoad);

  useEffect(() => {
    if (!loading && !error) {
      setTransactions(data.getUserTransactions);
      setHasMore(data.getUserTransactions.length === transactionsPerLoad);
    }
  }, [data, loading, error]);

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