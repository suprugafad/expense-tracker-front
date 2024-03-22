import { gql } from '@apollo/client';

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!, $description: String) {
    createCategory(createCategoryInput: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;