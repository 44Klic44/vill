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
    secure: process.env.NODE_ENV === "production", // true для HTTPS
    sameSite: 'lax', // всегда lax (работает и для HTTP, и для HTTPS)
  maxAge: 24 * 60 * 60 * 1000,
});
};