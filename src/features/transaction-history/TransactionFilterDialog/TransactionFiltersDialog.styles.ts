import { styled, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material';

export const transactionFiltersDialogStyles = {
  dialog: {
    height: '70vh',
    marginTop: '30vh', 
    '& .MuiPaper-rounded': { 
      borderTopLeftRadius: '30px', 
      borderTopRightRadius: '30px',
    },
  },

  dialogTitle: {
    marginTop: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  typography: { 
    margin: '15px 0 10px 10px', 
    fontWeight: 'bold', 
  },

  selectBox: {
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: 0.5,
  },

  boxResetButton: {
    display: 'flex', 
    justifyContent: 'flex-end',
  },

  resetButton: {
    width: '80px',  
    marginLeft: 'auto', 
    marginTop: '15px', 
    borderRadius: '25px', 
    border:'1px solid #f5edff', 
    backgroundColor: '#f5edff', 
    textTransform: 'none',
  },

  applyButton: {
    marginTop: '10px',
    width: '100%', 
    borderRadius: '15px', 
    height: '45px', 
    textTransform: 'none', 
    fontSize: '1.1rem'
  }
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: '1px solid',
    textTransform: 'none',
    fontSize: '1rem',
    width: '100px',
    borderRadius: '30px',
    '&.Mui-selected': {
      border:'1px solid #f5edff'
    },
  },
}));