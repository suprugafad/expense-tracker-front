import { SxProps, Theme } from '@mui/material';

export const TransactionListStyles: { [key: string]: SxProps<Theme> } = {
  list: {
    width: '100%', 
    bgcolor: 'background.paper', 
    marginBottom: '20px',
  },
  listSubheader: {
    zIndex: 0,
  },
  listItem: {
    backgroundColor: '#F6f6f7', 
    borderRadius: '20px', 
    marginBottom: '6px', 
    height: '80px',
  },
  listItemSecondaryAction: {
    textAlign: 'right',
  },
};