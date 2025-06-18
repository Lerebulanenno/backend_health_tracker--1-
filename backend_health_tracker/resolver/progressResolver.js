import db from '../db.js';

export const progressResolver = {
  Query: {
    progresses: () =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_progress', (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),

    progress: (_, args) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_progress WHERE id_progress = ?', [args.id_progress], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }),

    progressByUser: (_, args) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_progress WHERE id_user = ?', [args.id_user], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),
  },

  Mutation: {
    addProgress: (_, args) =>
      new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO tb_progress (id_user, id_trainner, drink, jarak, duration, calorine, jenis_kegiatan, waktu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [args.id_user, args.id_trainner, args.drink, args.jarak, args.duration, args.calorine, args.jenis_kegiatan, args.waktu],
          (err, result) => {
            if (err) reject(err);
            else resolve({ id_progress: result.insertId, ...args });
          }
        );
      }),

    updateProgress: (_, args) =>
      new Promise((resolve, reject) => {
        db.query(
          `UPDATE tb_progress SET drink = ?, jarak = ?, duration = ?, calorine = ?, jenis_kegiatan = ?, waktu = ? WHERE id_progress = ?`,
          [args.drink, args.jarak, args.duration, args.calorine, args.jenis_kegiatan, args.waktu, args.id_progress],
          (err, result) => {
            if (err) reject(err);
            else resolve({ id_progress: args.id_progress, ...args });
          }
        );
      }),
  },

  Progress: {
    user: (parent) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_user WHERE id_user = ?', [parent.id_user], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }),

    trainner: (parent) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_trainner WHERE id_trainner = ?', [parent.id_trainner], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }),
  },
};
