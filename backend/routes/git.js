import express from "express";
import { getUsersByLanguage } from "../controller/git.js";
const gitRouter = express.Router();

gitRouter.post("/gituser", getUsersByLanguage);

export default gitRouter;
