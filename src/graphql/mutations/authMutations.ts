import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    loginUser(loginUserInput: { email: $email, password: $password }) {
      access_token
      refresh_token
    }
  }
`;