import React from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { GET_ACCOUNT_SUMMARY } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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
    <Box sx={{ marginTop: '15px', backgroundColor: '#FFF7F0', width: '100%', padding: '5px', borderRadius: '15px'}}>
      <Box sx={{ my: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
        {/* <IconButton edge="start" sx={{ marginRight: 'auto', marginLeft: '0px', padding: '0' }}>
          <ManageAccountsIcon sx={{ color: '#575757', fontSize: '40px' }}/>
        </IconButton> */}
        <Typography variant="h6" component="h1" sx={{ textAlign: 'center', width: '100%' }}>
          {new Date().toLocaleString('default', { month: 'long' })}
        </Typography>
        {/* <Box sx={{ width: 75 }} /> */}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'success.main', margin: 1, width: '50%', borderRadius: '23px' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img src="/images/income.png" alt="Income Icon" />
            <Box sx={{ marginLeft: '8px' }}>
              <Typography color="white" gutterBottom>
                Income
              </Typography>
              <Typography variant="h6" color="white">
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
              <Typography variant="h6" color="white">
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
