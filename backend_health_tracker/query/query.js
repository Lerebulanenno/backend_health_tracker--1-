import { gql } from "graphql-tag";

export const queryDefs = gql`
  type Query {
    users: [User]
    user(id_user: Int!): User
    progresses: [Progress]
    progress(id_progress: Int!): Progress
    progressByUser(id_user: Int!): [Progress]
    getAllHistories: [History]
    getHistoryByUser(id_user: Int!): [History]
    reminderByUser(id_user: Int!): [Reminder]
    deleteHistoryByUser(id_user: Int!): Boolean
    deleteProgressByUser(id_user: Int!): Boolean
  }
`;
