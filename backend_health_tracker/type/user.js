// mutationDefs.js
import { gql } from "graphql-tag";

export const userType = gql`
  type ForgotPasswordResponse {
    success: Boolean!
    message: String!
  }
  type User {
    id_user: Int
    username: String
    gmail: String
    umur: Int
    profile: String
    gander: String
    tinggi_badan: Float
    berat_badan: Float
  }

  type Mutation {
    addUser(
      username: String!
      gmail: String!
      password: String!
      umur: Int!
      gander: String!
      tinggi_badan: Float!
      berat_badan: Float!
      profile: String
    ): User

    forgotPassword(gmail: String!, newPassword: String!): ForgotPasswordResponse
  }
`;
