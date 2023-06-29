import express from "express";
import {
  addBoard,
  deleteBoardById,
  getBoardsByUserId,
} from "../controller/board.js";
const boardRouter = express.Router();

boardRouter.post("/addBoard", addBoard);
boardRouter.get("/deleteBoard/:id", deleteBoardById);
boardRouter.get("/getBoards/:id", getBoardsByUserId);
export default boardRouter;
