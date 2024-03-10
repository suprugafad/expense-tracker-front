import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { GET_ACCOUNT_SUMMARY } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const AccountSummary = () => {
  const { data, loading, error } = useQuery(GET_ACCOUNT_SUMMARY);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { income, expenses } = data.getAccountSummary;

  return (
    <Box>
      <Typography variant="body1" component="div" textAlign="center">
        {new Date().toLocaleString('default', { month: 'long' })}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'success.main', margin: 1, width: '50%', borderRadius: '23px' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img src="/images/income.png" alt="Income Icon" />
            <Box sx={{ marginLeft: '8px' }}>
              <Typography color="white" gutterBottom>
                Income
              </Typography>
              <Typography variant="h5" color="white">
                {formatCurrency(income)}
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'error.main', margin: 1, width: '50%', borderRadius: '23px' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img src="/images/expenses.png" alt="Expenses Icon" />
            <Box sx={{ marginLeft: '8px' }}>
              <Typography color="white" gutterBottom>
                Expenses
              </Typography>
              <Typography variant="h5" color="white">
                {formatCurrency(expenses)}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default AccountSummary;
