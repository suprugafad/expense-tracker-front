import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { PeriodEnum } from '../../types';

interface TransactionHistoryHeaderProps {
  period: PeriodEnum,
  handleChangePeriod: (event: any) => void,
}

const TransactionHistoryHeader: React.FC<TransactionHistoryHeaderProps> = ({ period, handleChangePeriod }) => {
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Period</InputLabel>
          <Select
            value={period}
            label="Period"
            onChange={handleChangePeriod}
          >
            <MenuItem value={PeriodEnum.WEEK}>Week</MenuItem>
            <MenuItem value={PeriodEnum.MONTH}>Month</MenuItem>
            <MenuItem value={PeriodEnum.THREE_MONTHS}>3 Months</MenuItem>
            <MenuItem value={PeriodEnum.LAST_YEAR}>Last Year</MenuItem>
          </Select>
        </FormControl>

        <IconButton onClick={()=>{}} size='large' sx={{color: 'black', fontSize: 'large'}}>
          <FilterListIcon sx={{fontSize: '32px'}}/>
        </IconButton>
      </Box>
    </>
  )
}

export default TransactionHistoryHeader;