import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { GET_EXPENSES_BY_DAY } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';



const SpendFrequencyChart: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EXPENSES_BY_DAY, {
    variables: { days: 7 },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sums = data.getExpensesByDay.map((element: { sum: number }) => element.sum);
  const days = data.getExpensesByDay.map((element: { day: string }) => element.day);

  return (
    <Box sx={{marginTop: '12px', backgroundColor: '#f5edff', borderRadius: '15px'}}>
      <Typography variant="h6" component="h1" gutterBottom sx={{
        fontWeight: 'bold',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
        padding: '10px 0 0 20px',
        margin: 0
      }}>
        Spend Frequency
      </Typography>
      <LineChart
        width={370}
        height={270}
        series={[{ data: sums, type: 'line', area: true, color: '#7A41FA', showMark: false }]}
        xAxis={[{ scaleType: 'point', data: days }]}
        sx={{
          '.MuiLineElement-root': {
            display: 'none',
          },
        }}
      />             
    </Box>
  );
}

export default SpendFrequencyChart;
