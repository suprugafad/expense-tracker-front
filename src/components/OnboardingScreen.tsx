import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

const OnboardingScreen: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // This centers the content vertically, you can adjust it as per your design
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gain total control of your money
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          Become your own money manager and make every cent count
        </Typography>
        {/* Add your image or icon here */}
        <Box component="img" src="images/Illustration.png" alt="Control your money" sx={{ width: 250, height: 250, my: 4 }} />
        <Button variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default OnboardingScreen;
