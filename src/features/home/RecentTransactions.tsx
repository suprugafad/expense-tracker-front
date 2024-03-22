import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { GET_RECENT_TRANSACTIONS } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import TransactionList from '../../components/common/TransactionList';

const RecentTransactions: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { limit: 3 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = data.getUserTransactions;

  return (
    <Box sx={{marginTop: '10px'}}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0}}>
        <Typography variant="body1" sx={{fontWeight: 'bold'}}>Recent Transactions</Typography>
        <Button onClick={() => navigate('/transaction-history')} variant="outlined" color="primary" size="small" sx={{ borderRadius: '25px', border:'1px solid #f5edff', backgroundColor: '#f5edff', textTransform: 'none' }}>
          See all
        </Button>
      </Box>
      <TransactionList transactions={ transactions } isHomePage={true}/>
    </Box>
  );
};

export default RecentTransactions;