import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { useNavigate } from 'react-router-dom';
import { FooterWithFabStyles as styles } from './FooterWithFab.styles';

const FooterWithFab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleIncomeClick = () => {
    navigate('/transaction/income');
  };

  const handleExpenseClick = () => {
    navigate('/transaction/expense');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleHistoryClick = () => {
    navigate('/transaction-history');
  };

  const handleAnalyticsClick = () => {
    navigate('/home');
  };

  return (
    <Box sx={styles.footerBox}>
      <Box sx={styles.fabsBox}>
        <Fab color="default" size="medium" onClick={handleHomeClick}>
          <HomeIcon />
        </Fab>
        <Fab color="default" size="medium" onClick={handleHistoryClick}>
          <HistoryIcon />
        </Fab>
        <Fab color="primary" onClick={handleToggle} sx={{ position: 'relative', zIndex: 1 }}>
          {isOpen ? <CloseIcon /> : <AddIcon />}
        </Fab>
        <Fab color="default" size="medium" onClick={handleAnalyticsClick}>
          <DataUsageIcon />
        </Fab>
        <Fab color="default" size="medium">
          <PersonIcon />
        </Fab>
      </Box>
      {isOpen && (
        <Box
          sx={styles.toggleBox}
          onClick={handleToggle}
        />
      )}
      {isOpen && (
        <Box sx={styles.openedFabsBox}>
          <Fab color="secondary" sx={{ mb: 2, marginRight: '40px' }} onClick={handleIncomeClick}>
            <img src={'images/income-icon.png'} alt="Income" style={styles.fabImage} />
          </Fab>
          <Fab color="secondary" sx={{ mb: 2 }} onClick={handleExpenseClick}>
            <img src={'images/expenses-icon.png'} alt="Expense" style={styles.fabImage} />
          </Fab>
        </Box>
      )}
    </Box>
  );
};

export default FooterWithFab;
