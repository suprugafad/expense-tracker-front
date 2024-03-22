import React from 'react';
import { Container } from '@mui/material';
import ReportChart from '../features/financial-report/ReportChart';
import FooterWithFab from '../components/layout/FooterWithFab/FooterWithFab';

const FinancialReportPage: React.FC = () => {
  return (
    <Container>
      <ReportChart/>
      <FooterWithFab/>
    </Container>
  );
};

export default FinancialReportPage;