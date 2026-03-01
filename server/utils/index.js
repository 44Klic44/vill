import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
  }
};

export default dbConnection;


export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

res.cookie("token", token, {
  httpOnly: true,
     secure: true, // обязательно true, так как бэкенд на HTTPS
    sameSite: 'none', // разрешает отправку с другого домена
  maxAge: 24 * 60 * 60 * 1000,
});
};