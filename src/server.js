import "dotenv/config";
import express from "express";
import cors from "cors";

import movieRouter from "./routes/movieRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
  } catch (error) {
    console.error(`Start server failed ${error}`);
    process.exit(1);
  }
};

startServer();
