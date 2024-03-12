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