import React, { useContext, useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { GET_CATEGORIES } from '../../graphql/queries/transactionQueries';
import { useMutation, useQuery } from '@apollo/client';
import { Category } from '../../types';
import { AddCategoryDialog } from './AddCategoryDialog';
import { ADD_CATEGORY } from '../../graphql/mutations/categoryMutations';
import { SnackbarContext } from '../../contexts/SnackbarContext';

interface TransactionFormProps {
  categoryId: String;
  description: String;
  date: String;
  handleCategoryIdChange: (event: any) => void;
  handleDescriptionChange: (event: any) => void;
  handleDateChange: (event: any) => void;
  handleSubmit: (event: any) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  handleSubmit, 
  categoryId, 
  description, 
  date, 
  handleCategoryIdChange, 
  handleDescriptionChange, 
  handleDateChange 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  const { openSnackbar } = useContext(SnackbarContext);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNewCategoryName = (event: any) => {
    setNewCategoryName(event.target.value);
  };

  const handleNewCategoryDescription = (event: any) => {
    setNewCategoryDescription(event.target.value);
  };

  const [addCategory] = useMutation(ADD_CATEGORY, { refetchQueries: [ { query: GET_CATEGORIES }] });

  const onSubmitNewCategory = async () => {
    try {
      await addCategory({
        variables: {
          name: newCategoryName,
          description: newCategoryDescription,
        }
      });

    } catch (error: any) {
      if (error instanceof Error) {
        openSnackbar(error.message)
      } else {
        console.error('Error adding category:', error);
      }
    }
  };

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.getUserCategories;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 1, height: '60vh', backgroundColor: 'white', margin: '0px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '16px', textAlign: 'right' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryId}
          label="Category"
          onChange={handleCategoryIdChange}
          required
          sx={{ borderRadius: '15px', textAlign: 'left' }}
        >
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleClickOpenDialog} variant="outlined" color="primary" size="small" sx={{borderRadius: '25px', border:'none', backgroundColor: '#f5edff', textTransform: 'none'}}>
        Add new category
      </Button>
      <AddCategoryDialog 
        open={openDialog} 
        handleClose={handleCloseDialog} 
        name={newCategoryName} 
        description={newCategoryDescription} 
        handleDescriptionChange={handleNewCategoryDescription} 
        handleNameChange={handleNewCategoryName}
        onSubmitCategory={onSubmitNewCategory}/>
      <TextField
        fullWidth
        margin='normal'
        sx={{ marginTop:'25px' }}
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date and Time"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={handleDateChange}
        required
        sx={{borderRadius: '15px', marginTop:'25px'}}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2, borderRadius: '15px', height: '56px', textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
      >
        Create transaction
      </Button>
    </Box>
  );
};

export default TransactionForm;
