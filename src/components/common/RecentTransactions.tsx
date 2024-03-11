import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Typography, Box, Button } from '@mui/material';
import { Transaction, TransactionType } from '../../types';
import { GET_RECENT_TRANSACTIONS } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';

const RecentTransactions: React.FC = () => {
  const getImage = (type: TransactionType) => {
    return type === TransactionType.INCOME ? '/images/income.png' : '/images/expenses.png';
  };

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
        <Button variant="outlined" color="primary" size="small" sx={{borderRadius: '25px', border:'none', backgroundColor: '#f5edff', textTransform: 'none'}}>See all</Button>
      </Box>
      <List>
        {transactions.slice(0, 3).map((transaction: Transaction) => (
          <ListItem key={transaction.id} sx={{backgroundColor: '#F6f6f7', borderRadius: '20px', marginBottom: '6px'}}>
            <ListItemAvatar>
              <Avatar src={getImage(transaction.type)} alt={transaction.type} />
            </ListItemAvatar>
            <ListItemText
              primary={transaction.category.name}
              secondary={transaction.description || ''}
            />
            <ListItemSecondaryAction>
              <Typography variant="body2" color={transaction.type === TransactionType.EXPENSES ? "error" : "green"}>
                {transaction.type === TransactionType.EXPENSES ? '-' : '+'}${transaction.amount.toFixed(2)}
              </Typography>
              <Typography variant="caption" display="block" color="textSecondary">
                {transaction.time}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentTransactions;