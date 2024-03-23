import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import * as React from 'react';

export interface AddCategoryDialogProps {
  open: boolean;
  name: string;
  description: string;
  handleClose: () => void;
  handleNameChange: (event: any) => void;
  handleDescriptionChange: (event: any) => void;
  onSubmitCategory: () => void;
}

export const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ 
  open, 
  handleClose, 
  name, 
  description, 
  handleNameChange, 
  handleDescriptionChange, 
  onSubmitCategory 
}) => {

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmitCategory();
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>New Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in name and description for new category.
        </DialogContentText>
        <TextField
          autoFocus
          required
          value={name}
          onChange={handleNameChange}
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          value={description}
          onChange={handleDescriptionChange}
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Category</Button>
      </DialogActions>
    </Dialog>
  );
}