import React from 'react';
import { Container } from '@mui/material';
import ReportChart from '../common/ReportChart';
import FooterWithFab from '../common/FooterWithFab/FooterWithFab';

const FinancialReportPage: React.FC = () => {
  return (
    <Container>
      <ReportChart/>
      <FooterWithFab/>
    </Container>
  );
};

export default FinancialReportPage;