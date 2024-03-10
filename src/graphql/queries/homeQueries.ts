import { gql } from '@apollo/client';

export const GET_ACCOUNT_SUMMARY = gql`
  query GetAccountSummary {
    getAccountSummary {
      income
      expenses
    }
  }
`;