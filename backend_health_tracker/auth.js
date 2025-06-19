import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // simpan di .env sebaiknya

export const generateToken = (user) => {
  return jwt.sign(
    {
      id_user: user.id_user,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};
