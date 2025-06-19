import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // ✅ Import JWT

const SECRET_KEY = "your_jwt_secret_key"; // Ganti ini dengan process.env.JWT_SECRET jika pakai .env

export const userResolver = {
  Query: {
    users: () =>
      new Promise((resolve, reject) => {
        db.query("SELECT * FROM tb_user", (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),

    user: (_, args) =>
      new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM tb_user WHERE id_user = ?",
          [args.id_user],
          (err, results) => {
            if (err) reject(err);

            const user = results[0];

            if (user && user.profile && Buffer.isBuffer(user.profile)) {
              user.profile = user.profile.toString("base64");
            }

            resolve(user);
          }
        );
      }),
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 10);
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO tb_user (username, gmail, password, umur, gander, tinggi_badan, berat_badan)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              args.username,
              args.gmail,
              hashedPassword,
              args.umur,
              args.gander,
              args.tinggi_badan,
              args.berat_badan,
            ],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });
        return { ...args, profile: null, password: hashedPassword };
      } catch (error) {
        throw error;
      }
    },

    updateUser: async (_, args) => {
      try {
        const userExist = await new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM tb_user WHERE id_user = ?",
            [args.id_user],
            (err, results) => {
              if (err) reject(err);
              else resolve(results[0]);
            }
          );
        });

        if (!userExist) throw new Error("ID user tidak ditemukan");

        const updateFields = [
          args.username,
          args.gmail,
          args.profile,
          args.umur,
          args.gander,
          args.tinggi_badan,
          args.berat_badan,
          args.id_user,
        ];

        await new Promise((resolve, reject) => {
          db.query(
            `UPDATE tb_user 
             SET username = ?, gmail = ?, profile = ?, umur = ?, gander = ?, tinggi_badan = ?, berat_badan = ? 
             WHERE id_user = ?`,
            updateFields,
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
          profile: args.profile,
          umur: args.umur,
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
          db.query(
            "SELECT * FROM tb_user WHERE gmail = ?",
            [args.gmail],
            (err, results) => {
              if (err) reject(err);
              else resolve(results[0]);
            }
          );
        });

        if (!user) {
          return {
            success: false,
            message: "User tidak ditemukan",
            user: null,
            token: null,
          };
        }

        const isPasswordValid = await bcrypt.compare(
          args.password,
          user.password
        );

        if (!isPasswordValid) {
          return {
            success: false,
            message: "Password salah",
            user: null,
            token: null,
          };
        }

        // ✅ Generate JWT
        const token = jwt.sign(
          {
            id_user: user.id_user,
            gmail: user.gmail,
          },
          SECRET_KEY,
          { expiresIn: "7d" }
        );

        return {
          success: true,
          message: "Login berhasil",
          token: token,
          user: {
            id_user: user.id_user,
            username: user.username,
            gmail: user.gmail,
            umur: user.umur,
            profile: Buffer.isBuffer(user.profile)
              ? user.profile.toString("base64")
              : user.profile,
            gander: user.gander,
            tinggi_badan: user.tinggi_badan,
            berat_badan: user.berat_badan,
          },
        };
      } catch (error) {
        throw error;
      }
    },

    forgotPassword: async (_, args) => {
      try {
        const { gmail, newPassword } = args;

        const user = await new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM tb_user WHERE gmail = ?",
            [gmail],
            (err, results) => {
              if (err) reject(err);
              else resolve(results[0]);
            }
          );
        });

        if (!user) {
          return {
            success: false,
            message: "Email tidak ditemukan",
          };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await new Promise((resolve, reject) => {
          db.query(
            "UPDATE tb_user SET password = ? WHERE gmail = ?",
            [hashedPassword, gmail],
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });

        return {
          success: true,
          message: "Password berhasil direset",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message || "Terjadi kesalahan",
        };
      }
    },
  },
};
