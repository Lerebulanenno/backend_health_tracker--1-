import { gql } from "graphql-tag";

export const reminderTypeDefs = gql`
  type Reminder {
    id_reminder: Int!
    id_user: Int!
    time: String!
    message: String!
  }

  extend type Query {
    remindersByUser(id_user: Int!): [Reminder]
  }

  extend type Mutation {
    addReminder(id_user: Int!, time: String!, message: String!): Reminder
  }
`;
