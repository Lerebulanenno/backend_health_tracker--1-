import db from '../db.js';
import bcrypt from 'bcrypt';

export const userResolver = {
  Query: {
    users: () =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_user', (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),

    user: (_, args) =>
      new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_user WHERE id_user = ?', [args.id_user], (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }),
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 10);
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO tb_user (username, gmail, password, umur, profile, gander, tinggi_badan, berat_badan)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [args.username, args.gmail, hashedPassword, args.umur, args.profile, args.gander, args.tinggi_badan, args.berat_badan],
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

    updateUser: async (_, args) => {
      try {
        const userExist = await new Promise((resolve, reject) => {
          db.query('SELECT * FROM tb_user WHERE id_user = ?', [args.id_user], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });

        if (!userExist) {
          throw new Error('ID user tidak ditemukan');
        }

        const hashedPassword = await bcrypt.hash(args.password, 10);

        await new Promise((resolve, reject) => {
          db.query(
            `UPDATE tb_user SET username = ?, gmail = ?, password = ?, umur = ?, profile = ?, gander = ?, tinggi_badan = ?, berat_badan = ? WHERE id_user = ?`,
            [args.username, args.gmail, hashedPassword, args.umur, args.profile, args.gander, args.tinggi_badan, args.berat_badan, args.id_user],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });

        return {
          id_user: args.id_user,
          username: args.username,
          gmail: args.gmail,
          password: hashedPassword,
          umur: args.umur,
          profile: args.profile,
          gander: args.gander,
          tinggi_badan: args.tinggi_badan,
          berat_badan: args.berat_badan,
        };
      } catch (error) {
        throw error;
      }
    },

    loginUser: async (_, args) => {
      try {
        const user = await new Promise((resolve, reject) => {
          db.query('SELECT * FROM tb_user WHERE gmail = ?', [args.gmail], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          });
        });

        if (!user) {
          return {
            success: false,
            message: 'User tidak ditemukan',
            user: null,
          };
        }

        const isPasswordValid = await bcrypt.compare(args.password, user.password);
        if (!isPasswordValid) {
          return {
            success: false,
            message: 'Password salah',
            user: null,
          };
        }

        return {
          success: true,
          message: 'Login berhasil',
          user: {
            id_user: user.id_user,
            username: user.username,
            gmail: user.gmail,
            umur: user.umur,
            profile: user.profile,
            gander: user.gander,
            tinggi_badan: user.tinggi_badan,
            berat_badan: user.berat_badan,
          },
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
