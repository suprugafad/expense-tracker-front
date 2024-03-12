import React, { useState } from 'react';
import { Box, Fab, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';


const FooterWithFab = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: theme.spacing(2), left: 0, right: 0, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Fab color="default" size="medium">
            <AccountBalanceWalletIcon />
          </Fab>
          <Fab color="primary" onClick={handleToggle} sx={{ position: 'relative', zIndex: 1 }}>
            {isOpen ? <CloseIcon /> : <AddIcon />}
          </Fab>
          <Fab color="default" size="medium">
            <PersonIcon />
          </Fab>
        </Box>
        {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 'auto',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            zIndex: 1,
            background: 'linear-gradient(to top, rgba(100, 100, 255, 0.3), transparent)',
          }}
          onClick={handleToggle}
        />
      )}
        {isOpen && (
          <Box sx={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <Fab color="secondary" sx={{ mb: 2, marginRight: '40px' }}>
              <img src={'images/income-icon.png'} alt="Income" style={{ width: '100%', height: '100%' }} />
            </Fab>
            <Fab color="secondary" sx={{ mb: 2 }}>
              <img src={'images/expenses-icon.png'} alt="Expense" style={{ width: '100%', height: '100%' }} />
            </Fab>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FooterWithFab;
