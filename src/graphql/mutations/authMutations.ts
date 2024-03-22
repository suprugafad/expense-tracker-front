import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    loginUser(loginUserInput: { email: $email, password: $password }) {
      access_token
      refresh_token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(registerUserInput: { name: $name, email: $email, password: $password }) {
      id
      name
      email    
    }
  }
`;