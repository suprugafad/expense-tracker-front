import React, { useState } from 'react';
import { Box, Button, Typography, Container, IconButton, OutlinedInput, InputAdornment, InputLabel, FormControl } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [retypePassword, setRetypePassword] = useState('');
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRetypePassword = () => setShowRetypePassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleResetPassword = () => {
    // 
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Box sx={{ my: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={goBack} edge="start" sx={{ marginRight: 'auto' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ textAlign: 'center', width: '100%' }}>
            Reset Password
          </Typography>
          <Box sx={{ width: 48 }} />
        </Box>
        <Box component="form" onSubmit={handleResetPassword} noValidate sx={{ mt: 1 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">New password</InputLabel>
            <OutlinedInput
              id="password"
              required
              value={password}
              label="New password"
              type={showPassword ? 'text' : 'password'}
              name="password"
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
          <FormControl variant="outlined" fullWidth sx={{ marginTop: '15px' }}>
            <InputLabel htmlFor="retype-new-password">Retype New Password</InputLabel>
            <OutlinedInput
              id="retype-new-password"
              required
              value={retypePassword}
              label="Retype new password"
              type={showPassword ? 'text' : 'password'}
              name="retype-new-password"
              onChange={(e) => setRetypePassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRetypePassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showRetypePassword ? <VisibilityOff /> : <Visibility />}
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
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
