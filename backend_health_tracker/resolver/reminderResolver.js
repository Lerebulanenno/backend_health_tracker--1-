import db from "../db.js";

export const reminderResolver = {
  Query: {
    remindersByUser: (_, { id_user }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tb_reminder WHERE id_user = ?",
          [id_user],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    },
  },
  Mutation: {
    addReminder: (_, { id_user, time, message }) => {
      return new Promise((resolve, reject) => {
        const query =
          "INSERT INTO tb_reminder (id_user, time, message) VALUES (?, ?, ?)";
        db.query(query, [id_user, time, message], (err, result) => {
          if (err) return reject(err);
          resolve({
            id_reminder: result.insertId,
            id_user,
            time,
            message,
          });
        });
      });
    },
  },
};
