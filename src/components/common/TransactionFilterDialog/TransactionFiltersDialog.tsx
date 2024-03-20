import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  toggleButtonGroupClasses,
  styled,
  Typography,
} from '@mui/material';
import { GET_CATEGORIES } from '../../../graphql/queries/transactionQueries';
import { useQuery } from '@apollo/client';
import { Category } from '../../../types';

interface TransactionFiltersDialogProps {
  open: boolean;
  onClose: () => void;
}

type SortValue = 'highest' | 'lowest' | 'newest' | 'oldest';
type CategoryValue = string[];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: '1px solid',
    textTransform: 'none',
    fontSize: '1rem',
    width: '100px',
    borderRadius: '30px',
    '&.Mui-selected': {
      border: 'none',
    },
  },
}));

const dialogStyles = {
  height: '70vh',
  marginTop: '30vh',
  '& .MuiPaper-rounded': { 
    borderTopLeftRadius: '30px', 
    borderTopRightRadius: '30px' 
  },
};

const titleStyles = {
  marginTop: '5px',
  textAlign: 'center',
  fontWeight: 'bold',
};

const TransactionFiltersDialog: React.FC<TransactionFiltersDialogProps> = ({ open, onClose }) => {
  const [types, setTypes] = useState(() => ['expense', 'income']);
  const [sort, setSort] = useState<SortValue>('newest');
  const [category, setCategory] = useState<CategoryValue>([]);

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.getUserCategories;

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTypes: string[],) => {
      if (newTypes.length) {
        setTypes(newTypes);
      }
  };

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleReset = () => {
    setTypes(() => ['expense', 'income']);
    setSort('newest');
    setCategory([]);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen sx={dialogStyles}>
      <DialogTitle sx={titleStyles}>Filter Transactions</DialogTitle>
      <DialogContent>
        <Typography sx={{ margin: '0 0 10px 10px', fontWeight: 'bold' }}>Transaction type</Typography>
        <StyledToggleButtonGroup
          value={types}
          onChange={handleTypeChange}
          aria-label="type"
          color="primary"
        >
          <ToggleButton value="income" aria-label="income">
            Income
          </ToggleButton>
          <ToggleButton value="expense" aria-label="expense">
            Expense
          </ToggleButton>
        </StyledToggleButtonGroup>

        <Typography sx={{ margin: '15px 0 10px 10px', fontWeight: 'bold' }}>Sort by</Typography>
        <StyledToggleButtonGroup
          value={sort}
          onChange={handleSortChange}
          aria-label="sort"
          color="primary"
        >
          <ToggleButton value="highest" aria-label="highest">
            Highest
          </ToggleButton>
          <ToggleButton value="lowest" aria-label="lowest">
            Lowest
          </ToggleButton>
          <ToggleButton value="newest" aria-label="newest">
            Newest
          </ToggleButton>
          <ToggleButton value="oldest" aria-label="oldest">
            Oldest
          </ToggleButton>
        </StyledToggleButtonGroup>

        <Typography sx={{ margin: '15px 0 10px 10px', fontWeight: 'bold' }}>Category</Typography>
        <FormControl fullWidth>
          <Select
            multiple
            value={category}
            onChange={handleCategoryChange}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose Category</em>;
              }
              return ( 
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box> 
              )
            }}
          >
            {categories.map((category: Category) => (
              <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={handleReset} size="medium" sx={{ width: '80px',  marginLeft: 'auto', marginTop: '15px', borderRadius: '25px', border:'1px solid #f5edff', backgroundColor: '#f5edff', textTransform: 'none'}}>
            Reset
          </Button>
        </Box>
        <Button onClick={onClose} variant="contained" sx={{marginTop: '10px',width: '100%', borderRadius: '15px', height: '45px', textTransform: 'none', fontSize: '1.1rem'}}>
          Apply
        </Button>
      </DialogContent>
        
    </Dialog>
  );
}

export default TransactionFiltersDialog;
