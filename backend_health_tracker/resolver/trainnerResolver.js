import db from '../db.js';
import bcrypt from 'bcrypt';

export const trainnerResolver = {
  Query: {
    trainners: () =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_trainner', (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),

    trainner: (_, args) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_trainner WHERE id_trainner = ?', [args.id_trainner], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }),
  },

  Mutation: {
    addTrainner: async (_, args) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 10);
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO tb_trainner (id_user, username, spesialis, gmail, password) VALUES (?, ?, ?, ?, ?)`,
            [args.id_user, args.username, args.spesialis, args.gmail, hashedPassword],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });
        return { ...args, password: hashedPassword };
      } catch (error) {
        throw error;
      }
    },

    updateTrainner: async (_, args) => {
      try {
        const trainnerExist = await new Promise((resolve, reject) => {
          db.query('SELECT * FROM tb_trainner WHERE id_trainner = ?', [args.id_trainner], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });

        if (!trainnerExist) {
          throw new Error('ID trainner tidak ditemukan');
        }

        const hashedPassword = await bcrypt.hash(args.password, 10);

        await new Promise((resolve, reject) => {
          db.query(`UPDATE tb_trainner SET username = ?, gmail = ?, password = ? WHERE id_trainner = ?`, [args.username, args.gmail, hashedPassword, args.id_trainner], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        return {
          id_trainner: args.id_trainner,
          username: args.username,
          gmail: args.gmail,
          password: hashedPassword,
        };
      } catch (error) {
        throw error;
      }
    },
  },

  Trainner: {
    user: (parent) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_user WHERE id_user = ?', [parent.id_user], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }),
  },
};
