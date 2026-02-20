import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { dbConnection } from "./utils/index.js";


dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();