import React, { useEffect, useState } from 'react';
import { GET_AMOUNTS_BY_CATEGORY } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';
import { PieChart } from '@mui/x-charts';
import { Box, FormControl, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, ToggleButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { StyledToggleButtonGroup } from './TransactionFilterDialog/TransactionFiltersDialog.styles';
import { PeriodEnum, TransactionType } from '../../types';

type ChartDataItem = {
  category: string;
  sum: number;
};

type ChartData = ChartDataItem[];

const colors = ['#FFA726', '#42A5F5', '#EF5350', '#AB47BC', '#26C6DA'];

function periodToNum(period: PeriodEnum): number {
  switch (period) {
    case PeriodEnum.WEEK:
      return 7;
    case PeriodEnum.MONTH:
      return 30;
    case PeriodEnum.THREE_MONTHS:
      return 90;
    case PeriodEnum.LAST_YEAR:
      return 365;  
  }

  return 30;
}

const ReportChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>([]);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSES)
  const [period, setPeriod] = useState(PeriodEnum.MONTH);

  const handleChangePeriod = (event: any) => {
    setPeriod(event.target.value);
  };

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_AMOUNTS_BY_CATEGORY, {
    variables: { days: periodToNum(period), type },
  });

  useEffect(() => {
    if (data) {
      setChartData(data.getAmountsByCategory);
    }
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const goBack = () => {
    navigate(-1);
  };

  const handleTypeChange = (
    event: any
  ) => {    
    setType(event.target.value);
  };

  return (
    <Box >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px'}}>
        <IconButton edge="start" aria-label="back" onClick={goBack} sx={{color: 'black'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', textAlign: 'center' }}>
          Financial Report
        </Typography>
        <Box sx={{width: '25px'}}></Box>
      </Box>
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
    <PieChart
    height={290}
    colors={colors}
    sx={{marginLeft: '15%'}}
      series={[
        {
          data: chartData.map((item, index) => ({
            id: `item-${index}`,
            value: item.sum
          })),
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          cx: 150,
          cy: 150,
        },
      ]}
    />
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <StyledToggleButtonGroup
          value={type}
          onChange={handleTypeChange}
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
        </Box>
    <List>
      {chartData.map((item: ChartDataItem, index: number) => {
        const color = colors[index % colors.length];

        return (
          <ListItem key={item.category}>
            <ListItemIcon>
              <Box width="10px" height="10px" bgcolor={color} />
            </ListItemIcon>
            <ListItemText primary={item.category} />
            <Typography variant="subtitle1" style={{ marginLeft: 'auto' }}>
              ${item.sum.toFixed(2)}
            </Typography>
          </ListItem>
        );
      })}
    </List>
    </Box>
  )
}

export default ReportChart;
