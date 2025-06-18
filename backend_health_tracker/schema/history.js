import { gql } from 'graphql-tag';

export const historyType = gql`
  type History {
    id_history: int
    id_user: int
    id_progress: int
  }
`;