import { gql } from '@apollo/client';

export const GET_ACCOUNT_SUMMARY = gql`
  query GetAccountSummary {
    getAccountSummary {
      income
      expenses
    }
  }
`;

export const GET_EXPENSES_BY_DAY = gql`
  query GetExpensesByDay($days: Float!) {
    getExpensesByDay(days: $days) {
      day
      sum
    }
  }
`;