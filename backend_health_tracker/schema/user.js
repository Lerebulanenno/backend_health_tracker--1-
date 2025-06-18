import { gql } from 'graphql-tag';

export const userType = gql`
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
`;
