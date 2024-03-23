import React from 'react';
import { IconButton, Typography, TextField, Box, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface TransactionHeaderProps {
  pageTitle: string;
  amount: string;
  amountError: string;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ pageTitle, amount, amountError, handleAmountChange }) => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{height: '45vh', padding: '16px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton edge="start" aria-label="back" onClick={goBack} sx={{color: 'white'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', textAlign: 'center' }}>
          {pageTitle}
        </Typography>
        <Box sx={{width: '35px'}}></Box>
      </Box>
      <Box sx={{ my: 2,  marginTop: '70px', padding: '20px' }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{color: 'white', fontWeight: 'bold', marginBottom: '0'}}>
          How much?
        </Typography>
        <TextField
          type="number"
          error={!!amountError}
          helperText={amountError}
          FormHelperTextProps={{
            sx: { 
              fontSize: '1.1rem',
              backgroundColor: 'white',
              textAlign: 'center',
              borderRadius: '5px',
              fontStyle: 'italic',
              fontWeight: 'bold',
            }
          }}
          variant="outlined"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          inputProps={{ style: { fontSize: '4rem' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ fontSize: '4rem', lineHeight: '1', color: 'white', fontWeight: 'bold' }}>
                  $
                </Typography>
              </InputAdornment>
            ),
            style: { fontSize: '4rem' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none'
              },
              '&:hover fieldset': {
                border: 'none'
              },
              '&.Mui-focused fieldset': {
                border: 'none'
              },
              '& .MuiInputBase-input': {
                padding: 0,
              },
              color: 'white',
              padding: '0'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default TransactionHeader;
