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
  query GetUserTransactions($limit: Float, $skip: Float, $startDate: DateTime, $endDate: DateTime, $categoryIds: [String!], $type: TransactionTypeEnum, $sortOrder: SortOrderEnum! = NEWEST) {
    getUserTransactions(filters: { limit: $limit, skip: $skip, startDate: $startDate, endDate: $endDate, categoryIds: $categoryIds, type: $type, sortOrder: $sortOrder }) {
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