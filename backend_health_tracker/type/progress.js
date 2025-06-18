import { gql } from 'graphql-tag';

export const progressType = gql`
  type Progress {
    id_progress: Int
    id_user: Int
    id_trainner: Int
    drink: Float
    jarak: Float
    duration: String
    calorine: Float
    jenis_kegiatan: String
    waktu: String
    user: User
    trainner: Trainner
  }
`;
