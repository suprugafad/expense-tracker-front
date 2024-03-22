import { gql } from '@apollo/client';

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($amount: Float!, $type: TransactionTypeEnum!, $description: String, $categoryId: String!, $date: DateTime) {
    createTransaction(createTransactionInput: { amount: $amount, type: $type, categoryId: $categoryId, description: $description, date: $date }) {
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