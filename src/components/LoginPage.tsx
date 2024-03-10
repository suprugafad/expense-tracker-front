import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, IconButton, OutlinedInput, InputAdornment, InputLabel, FormControl, Alert } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import useLogin from '../hooks/useLogin';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = useState('');

  const { login } = useLogin();

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoginError('');

    try {
      const user = await login(email, password);

      Cookies.set('accessToken', user.access_token, { expires: 1 });
      Cookies.set('refreshToken', user.refresh_token, { expires: 7 });

      const accessTokenExpiry = new Date(new Date().getTime() + 60 * 60 * 1000);
      Cookies.set('accessToken', user.access_token, { expires: accessTokenExpiry });

      const refreshTokenExpiry = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
      Cookies.set('refreshToken', user.refresh_token, { expires: refreshTokenExpiry });

      navigate('/home');
    } catch (err) {
      setLoginError('Unable to login. Please check your entries and try again.');
      console.error('Login error: ', err);
    }
  };

  const handleResetPasswordClick = () => {
    navigate('/reset-password');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container component="main" maxWidth="xs">
      {loginError && <Alert severity="error">{loginError}</Alert>}
      <Box sx={{ marginTop: 8 }}>
        <Box sx={{ my: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={goBack} edge="start" sx={{ marginRight: 'auto' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ textAlign: 'center', width: '100%' }}>
            Login
          </Typography>
          <Box sx={{ width: 48 }} />
        </Box>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            Login
          </Button>
          <Box textAlign="center">
            <Button sx={{ textTransform: 'none' }} onClick={handleResetPasswordClick}>
              Forgot Password?
            </Button>
            <Typography variant="body2">
              Don't have an account yet?{' '}
              <Button sx={{ textTransform: 'none' }}>
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
