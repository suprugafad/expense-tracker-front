import React from 'react';
import { Box, Button, Container } from '@mui/material';
import Carousel from './Carousel';

const OnboardingScreen: React.FC = () => {
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
          <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OnboardingScreen;
