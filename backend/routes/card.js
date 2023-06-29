import express from "express";
const cardRouter = express.Router();

import {
  addCard,
  getallCardsByBoardId,
  deleteCard,
  getAllCard,
  addList,
  updateListById,
  deleteFromListById,
} from "../controller/card.js";
import card from "../models/card.js";

cardRouter.get("/allCards/:id", getallCardsByBoardId);
cardRouter.post("/addcard/:id", addCard);
cardRouter.delete("/deletecard/:id", deleteCard);
cardRouter.get("/getallcard", getAllCard);
cardRouter.post("/addList/:id", addList);
cardRouter.post("/updateList/:id", updateListById);
cardRouter.post("/deleteList/:id", deleteFromListById);
export default cardRouter;
