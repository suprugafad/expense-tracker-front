import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetUserCategories {
    getUserCategories {
      id
      name
      description
      user {
        id
      }
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($limit: Float, $startDate: DateTime, $endDate: DateTime, $categoryId: String, $type: TransactionTypeEnum) {
    getUserTransactions(filters: { limit: $limit, startDate: $startDate, endDate: $endDate, categoryId: $categoryId, type: $type }) {
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
`