import { gql } from "graphql-tag";

export const mutationDefs = gql`
  type Mutation {
    # USER
    addUser(
      username: String!
      gmail: String!
      password: String
      umur: Int!
      gander: String!
      tinggi_badan: Float!
      berat_badan: Float!
    ): User

    updateUser(
      id_user: Int!
      username: String
      gmail: String
      password: String
      umur: Int
      gander: String
      tinggi_badan: Float
      berat_badan: Float
      profile: String
    ): User

    loginUser(gmail: String!, password: String!): LoginResponse
    forgotPassword(gmail: String!, newPassword: String!): ForgotPasswordResponse

    # PROGRESS
    addProgress(
      id_user: Int!
      drink: Float!
      jarak: Float!
      duration: String!
      calorine: Float!
      jenis_kegiatan: String!
      waktu: String!
    ): Progress

    updateProgress(
      id_progress: Int!
      drink: Float
      jarak: Float
      duration: String
      calorine: Float
      jenis_kegiatan: String
      waktu: String
    ): Progress

    deleteProgress(id_progress: Int!): Boolean

    # HISTORY
    addHistory(id_user: Int!, id_progress: Int!): History
    deleteHistory(id_history: Int!): Boolean
    deleteHistoryByUser(id_user: Int!): Boolean # ✅ Tambahkan baris ini
    # REMINDER
    addReminder(id_user: Int!, time: String!, message: String!): Reminder
  }

  type ForgotPasswordResponse {
    success: Boolean!
    message: String!
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    user: User
  }
`;
