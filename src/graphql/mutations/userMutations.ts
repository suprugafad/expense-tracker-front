import { gql } from '@apollo/client';

export const CHANGE_USER_PASSWORD = gql`
mutation ChangeUserPassword($email: String!, $password: String!) {
  changeUserPassword(changeUserPasswordInput: { oldPassword: $oldPassword, newPassword: $newPassword }) {
    access_token
    refresh_token
  }
}
`;