import db from "../db.js";

export const historyResolver = {
  Query: {
    // Ambil semua data history
    getAllHistories: () =>
      new Promise((resolve, reject) => {
        db.query("SELECT * FROM tb_history", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),

    // Ambil history berdasarkan id_user
    getHistoryByUser: (_, { id_user }) =>
      new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tb_history WHERE id_user = ?",
          [id_user],
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
      }),
  },

  // Nested resolver: ambil detail progress dari tiap history
  History: {
    progress: (parent) =>
      new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tb_progress WHERE id_progress = ?",
          [parent.id_progress],
          (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          }
        );
      }),

    // Optional: nested user (jika kamu butuh info user dari history)
    user: (parent) =>
      new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tb_user WHERE id_user = ?",
          [parent.id_user],
          (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          }
        );
      }),
  },

  Mutation: {
    // Tambah entry history
    addHistory: (_, { id_user, id_progress }) =>
      new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO tb_history (id_user, id_progress) VALUES (?, ?)",
          [id_user, id_progress],
          (err, result) => {
            if (err) reject(err);
            else {
              const newHistory = {
                id_history: result.insertId,
                id_user,
                id_progress,
              };
              resolve(newHistory);
            }
          }
        );
      }),

    // Hapus satu history berdasarkan id_history
    deleteHistory: (_, { id_history }) =>
      new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM tb_history WHERE id_history = ?",
          [id_history],
          (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
          }
        );
      }),

    // Hapus semua history milik user tertentu
    deleteHistoryByUser: (_, { id_user }) =>
      new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM tb_history WHERE id_user = ?",
          [id_user],
          (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
          }
        );
      }),
  },
};
