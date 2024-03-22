import { Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, Typography } from '@mui/material';
import React from 'react';
import { Transaction, TransactionType } from '../../types';
import { format } from 'date-fns';
import { useTransactionFilter } from '../../contexts/TransactionFilterContext';

export interface TransactionListProps {
  transactions: Transaction[];
  isHomePage: boolean;
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
    const date = formatDate(transaction.date).split(',')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isHomePage }) => {  
  const { sort } = useTransactionFilter();

  let areGrouped = sort === 'oldest' || sort === 'newest';

  const groupedTransactions = areGrouped ? groupTransactionsByDate(transactions) : { '': transactions };

  return(
    <List sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '20px' }}>
      {Object.keys(groupedTransactions).map((date) => (
        <React.Fragment key={date}>
          {!isHomePage && <ListSubheader sx={{zIndex: 0}}>{date}</ListSubheader>}
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