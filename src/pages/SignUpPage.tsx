import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Container, IconButton, OutlinedInput, InputAdornment, InputLabel, FormControl } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations/authMutations';
import { SnackbarContext } from '../contexts/SnackbarContext';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const [registerUser] = useMutation(REGISTER_USER);

  const { openSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();  
    try {
      await registerUser({
        variables: {
          name,
          email,
          password,
        },
      });

      openSnackbar('User was registered successfully')
      navigate('/');
    } catch (err) {
      console.error('Error during login', err);
      throw err;
    } 
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Box sx={{ my: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={goBack} edge="start" sx={{ marginRight: 'auto' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ textAlign: 'center', width: '100%' }}>
            Sign Up
          </Typography>
          <Box sx={{ width: 48 }} />
        </Box>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password *</InputLabel>
            <OutlinedInput
              id="password"
              required
              value={password}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box textAlign="center">
            <Typography variant="body2">
              Do have an account?{' '}
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/login')}>
                Log In
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
