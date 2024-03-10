import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { GET_EXPENSES_BY_DAY } from '../../graphql/queries/homeQueries';
import { useQuery } from '@apollo/client';

const SpendFrequencyChart: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EXPENSES_BY_DAY, {
    variables: { days: 7 },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sums = data.getExpensesByDay.map((element: { sum: number }) => element.sum);
  const days = data.getExpensesByDay.map((element: { day: string }) => element.day);

  return (
    <LineChart
      width={380}
      height={300}
      series={[{ data: sums, type: 'line', area: true, color: '#7A41FA', showMark: false }]}
      xAxis={[{ scaleType: 'point', data: days }]}
      sx={{
        '.MuiLineElement-root': {
          display: 'none',
        },
      }}
    />
  );
}

export default SpendFrequencyChart;
