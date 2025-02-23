import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./auth/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
