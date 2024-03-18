import React, { useState, useCallback, FunctionComponent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContext } from '../../contexts/SnackbarContext';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: FunctionComponent<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = useCallback((newMessage: string) => {
    setMessage(newMessage);
    setOpen(true);
  }, []);

  const closeSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  const contextValue = {
    openSnackbar,
    closeSnackbar
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={message}
        onClose={closeSnackbar}
        autoHideDuration={4000}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
