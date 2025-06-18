import { gql } from 'graphql-tag';

export const loginResponseType = gql`
  type LoginResponse {
    success: Boolean!
    message: String!
    user: User
  }
`;