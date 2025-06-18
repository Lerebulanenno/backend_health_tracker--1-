import { gql } from 'graphql-tag';

export const queryDefs = gql`
  type Query {
    users: [User]
    user(id_user: Int!): User
    trainners: [Trainner]
    trainner(id_trainner: Int!): Trainner
    progresses: [Progress]
    progress(id_progress: Int!): Progress
    progressByUser(id_user: Int!): [Progress]
  }
`;
