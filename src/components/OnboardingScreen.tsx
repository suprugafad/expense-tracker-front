import React from 'react';
import { Box, Button, Container } from '@mui/material';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';

const OnboardingScreen: React.FC = () => {
  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Carousel />
        <Box sx={{
          width: '100%',
          marginTop: '20px'
        }}>
          <Button variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
          <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLoginClick}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OnboardingScreen;
