import { gql } from "graphql-tag";

export const historyType = gql`
  type History {
    id_history: ID!
    id_user: Int
    id_progress: Int
    progress: Progress
    user: User
  }

  type Query {
    getHistoryByUser(id_user: Int!): [History]
  }

  type Mutation {
    deleteHistoryByUser(id_user: Int!): Boolean
  }
`;
