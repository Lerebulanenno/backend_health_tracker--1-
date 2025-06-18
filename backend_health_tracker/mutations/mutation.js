import { gql } from 'graphql-tag';

export const mutationDefs = gql`
  type Mutation {
    addUser(username: String!, gmail: String!, password: String!, umur: Int!, profile: String!, gander: String!, tinggi_badan: Float!, berat_badan: Float!): User
    updateUser(id_user: Int!, username: String!, gmail: String!, password: String!, umur: Int!, profile: String!, gander: String!, tinggi_badan: Float!, berat_badan: Float!): User
    loginUser(gmail: String!, password: String!): LoginResponse
    addTrainner(id_user: Int!, username: String!, spesialis: String!, gmail: String!, password: String!): Trainner
    updateTrainner(id_trainner: Int!, username: String!, gmail: String!, password: String!): Trainner
    addProgress(id_user: Int!, id_trainner: Int!, drink: Float!, jarak: Float!, duration: String!, calorine: Float!, jenis_kegiatan: String!, waktu: String!): Progress
    updateProgress(id_progress: Int!, drink: Float!, jarak: Float!, duration: String!, calorine: Float!, jenis_kegiatan: String!, waktu: String!): Progress
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    user: User
  }
`;
