import { Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, Typography } from '@mui/material';
import React from 'react';
import { Transaction, TransactionType } from '../../types';
import { format } from 'date-fns';

export interface TransactionListProps {
  transactions: Transaction[];
}

const getImage = (type: TransactionType) => {
  return type === TransactionType.INCOME ? '/images/income.png' : '/images/expenses.png';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "dd MMM, HH:mm");
};

interface GroupedTransactions {
  [key: string]: Transaction[];
}

const groupTransactionsByDate = (transactions: Transaction[]) => {
  return transactions.reduce((groups: GroupedTransactions, transaction: Transaction) => {
    const date = formatDate(transaction.date).split(',')[0]; // 19 Jan, 10:54 -> 19 Jan
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {  
  const groupedTransactions = groupTransactionsByDate(transactions);

  return(
    <List sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '60px' }}>
      {Object.keys(groupedTransactions).map((date) => (
        <React.Fragment key={date}>
          {transactions.length > 3 && <ListSubheader>{date}</ListSubheader>}
          {groupedTransactions[date].map((transaction) => (
            <ListItem key={transaction.id} sx={{ backgroundColor: '#F6f6f7', borderRadius: '20px', marginBottom: '6px', height: '80px' }}>
              <ListItemAvatar>
                <Avatar src={getImage(transaction.type)} alt={transaction.type} />
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category.name}
                secondary={transaction.description || ''}
              />
              <ListItemSecondaryAction sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color={transaction.type === TransactionType.EXPENSES ? "error" : "green"}>
                  {transaction.type === TransactionType.EXPENSES ? '-' : '+'}${transaction.amount.toFixed(2)}
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary">
                  {formatDate(transaction.date)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}

export default TransactionList;