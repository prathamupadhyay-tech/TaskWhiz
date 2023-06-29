import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardRouter from "./routes/card.js";
import userRouter from "./routes/auth.js";
import boardRouter from "./routes/boards.js";
import gitRouter from "./routes/git.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api", cardRouter);
app.use("/api", userRouter);
app.use("/api", boardRouter);
app.use("/api", gitRouter);

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("connect successful to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
