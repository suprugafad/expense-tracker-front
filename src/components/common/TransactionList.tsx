import { Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Transaction, TransactionType } from '../../types';

export interface TransactionListProps {
  transactions: Transaction[];
}

const getImage = (type: TransactionType) => {
  return type === TransactionType.INCOME ? '/images/income.png' : '/images/expenses.png';
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return(
    <List>
      {transactions.map((transaction: Transaction) => (
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
  )
}

export default TransactionList;