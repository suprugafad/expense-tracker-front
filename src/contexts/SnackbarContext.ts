import { createContext } from 'react';

interface SnackbarContextState {
  openSnackbar: (message: string) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextState>({
  openSnackbar: () => {},
  closeSnackbar: () => {}
});