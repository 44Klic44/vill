import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
dbConnection();

const app = express();


app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.CLIENT_URL,
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5174"
      ].filter(Boolean);
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});