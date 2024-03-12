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

export const GET_RECENT_TRANSACTIONS = gql`
  query GetRecentTransactions($limit: Float!) {
    getUserTransactions(filters: { limit: $limit }) {
      id
      amount
      type
      category {
        id
        name
      }
      description
      date
    }
  }
`;