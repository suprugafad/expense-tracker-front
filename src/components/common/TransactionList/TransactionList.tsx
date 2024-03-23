import { Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, Typography } from '@mui/material';
import React from 'react';
import { Transaction, TransactionType } from '../../../types';
import { useTransactionFilter } from '../../../contexts/TransactionFilterContext';
import { formatDate, getImage, groupTransactionsByDate } from '../../../utils/transactionUtils';
import { TransactionListStyles as styles } from './TransactionList.styles';

export interface TransactionListProps {
  transactions: Transaction[];
  isHomePage: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isHomePage }) => {  
  const { sort } = useTransactionFilter();

  let areGrouped = sort === 'oldest' || sort === 'newest';

  const groupedTransactions = areGrouped ? groupTransactionsByDate(transactions) : { '': transactions };

  return(
    <List sx={styles.list}>
      {Object.keys(groupedTransactions).map((date) => (
        <React.Fragment key={date}>
          {!isHomePage && <ListSubheader sx={styles.listSubheader}>{date}</ListSubheader>}
          {groupedTransactions[date].map((transaction) => (
            <ListItem key={transaction.id} sx={styles.listItem}>
              <ListItemAvatar>
                <Avatar src={getImage(transaction.type)} alt={transaction.type} />
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category.name}
                secondary={transaction.description || ''}
              />
              <ListItemSecondaryAction sx={styles.listItemSecondaryAction}>
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