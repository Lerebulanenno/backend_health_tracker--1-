import { gql } from "graphql-tag";

export const trainnerType = gql`
  type Trainner {
    id_trainner: Int
    id_user: Int
    username: String
    spesialis: String
    gmail: String
    password: String
    user: User
  }
`;
