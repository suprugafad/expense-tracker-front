import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { GET_CATEGORIES } from '../../../graphql/queries/transactionQueries';
import { useQuery } from '@apollo/client';
import { Category, TransactionType } from '../../../types';
import { StyledToggleButtonGroup, transactionFiltersDialogStyles as styles } from './TransactionFiltersDialog.styles';
import { useTransactionFilter } from '../../../contexts/TransactionFilterContext';

interface TransactionFiltersDialogProps {
  open: boolean;
  onClose: () => void;
}

type SortValue = 'highest' | 'lowest' | 'newest' | 'oldest';
type CategoriesValue = string[];

const TransactionFiltersDialog: React.FC<TransactionFiltersDialogProps> = ({ open, onClose }) => {
  const { types, sort, categories, setTypes, setSort, setCategories } = useTransactionFilter();
  
  const [localTypes, setLocalTypes] = useState<TransactionType[]>(types);
  const [localSort, setLocalSort] = useState<SortValue>(sort);
  const [localCategories, setLocalCategories] = useState<CategoriesValue>(categories);

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categoriesResult = data.getUserCategories;

  const handleLocalTypeChange = (
    event: React.MouseEvent<HTMLElement>, 
    newTypes: TransactionType[]
  ) => {
    if (newTypes.length > 0) {
      setLocalTypes(newTypes);
    }
  };

  const handleLocalSortChange = (event: any) => {
    setLocalSort(event.target.value);
  };

  const handleLocalCategoryChange = (event: any) => {
    setLocalCategories(event.target.value);
  };

  const handleReset = () => {
    setLocalTypes(() => [TransactionType.INCOME, TransactionType.EXPENSES]);
    setLocalSort('newest');
    setLocalCategories([]);
  };

  const handleClose = () => {
    setLocalTypes(types);
    setLocalSort(sort);
    setLocalCategories(categories);

    onClose();
  }

  const handleApply = () => {
    setTypes(localTypes);
    setSort(localSort);
    setCategories(localCategories);

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen sx={styles.dialog}>
      <DialogTitle sx={styles.dialogTitle}>
        Filter Transactions
      </DialogTitle>
      <DialogContent>
        <Typography sx={styles.typography}>
          Transaction type
        </Typography>
        <StyledToggleButtonGroup
          value={localTypes}
          onChange={handleLocalTypeChange}
          aria-label="type"
          color="primary"
        >
          <ToggleButton value={TransactionType.INCOME} aria-label={TransactionType.INCOME}>
            Income
          </ToggleButton>
          <ToggleButton value={TransactionType.EXPENSES} aria-label={TransactionType.EXPENSES}>
            Expense
          </ToggleButton>
        </StyledToggleButtonGroup>

        <Typography sx={styles.typography}>Sort by</Typography>
        <StyledToggleButtonGroup
          value={localSort}
          onChange={handleLocalSortChange}
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

        <Typography sx={styles.typography}>Category</Typography>
        <FormControl fullWidth>
          <Select
            multiple
            value={localCategories}
            onChange={handleLocalCategoryChange}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose Category</em>;
              }
              return ( 
                <Box sx={styles.selectBox}>
                  {selected.map((id) => {
                    const category = categoriesResult.find((c: Category) => c.id === id);
                    return category ? (
                      <Chip key={id} label={category.name} />
                    ) : null;
                  })}
                </Box> 
              )
            }}
          >
            {categoriesResult.map((category: Category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={styles.boxResetButton}>
          <Button onClick={handleReset} size="medium" sx={styles.resetButton}>
            Reset
          </Button>
        </Box>
        <Button onClick={handleApply} variant="contained" sx={styles.applyButton}>
          Apply
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionFiltersDialog;
