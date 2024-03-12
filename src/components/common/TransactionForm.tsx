import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { GET_CATEGORIES } from '../../graphql/queries/transactionQueries';
import { useQuery } from '@apollo/client';

interface FormData {
  category: string;
  description: string;
  date: string;
}

interface TransactionFormProps {
  onSubmit: (data: FormData) => void;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 16));

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.getUserCategories;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit({ category, description, date });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 1, height: '60vh', backgroundColor: 'white', margin: '0px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '16px', textAlign: 'right' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
          required
          sx={{ borderRadius: '15px', textAlign: 'left' }}
        >
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" color="primary" size="small" sx={{borderRadius: '25px', border:'none', backgroundColor: '#f5edff', textTransform: 'none'}}>
        Add new category
      </Button>
      <TextField
        fullWidth
        margin='normal'
        sx={{marginTop:'25px'}}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date and Time"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
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
