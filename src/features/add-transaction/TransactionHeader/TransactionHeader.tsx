import React from 'react';
import { IconButton, Typography, TextField, Box, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { TransactionHeaderStyles as styles } from './TransactionHeader.styles';

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
    <Box sx={styles.headerBox}>
      <Box sx={styles.headerControlsBox}>
        <IconButton edge="start" aria-label="back" onClick={goBack} sx={styles.backButton}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={styles.pageTitle}>
          {pageTitle}
        </Typography>
        <Box sx={styles.spacerBox}></Box>
      </Box>
      <Box sx={styles.contentBox}>
        <Typography variant="h6" component="h2" gutterBottom sx={styles.questionTypography}>
          How much?
        </Typography>
        <TextField
          type="number"
          error={!!amountError}
          helperText={amountError}
          FormHelperTextProps={{
            sx: styles.helperText
          }}
          variant="outlined"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          inputProps={styles.inputProps}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={styles.dollarTypography}>
                  $
                </Typography>
              </InputAdornment>
            ),
            style: { fontSize: '4rem' },
          }}
          sx={styles.textField}
        />
      </Box>
    </Box>
  );
};

export default TransactionHeader;
