import board from "../models/board.js";
import cards from "../models/card.js";
import user from "../models/user.js";

export const addCard = async (req, res, next) => {
  const ourBoard = req.params.id;
  const { title, description, ourUser } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  try {
    const existingUser = await user.findById(ourUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingBoard = await board.findById(ourBoard);
    if (!existingBoard) {
      return res.status(404).json({ message: "Board not found." });
    }

    const newCard = new cards({ title, description, ourUser, ourBoard });
    const savedCard = await newCard.save();
    console.log(savedCard);
    existingUser.userCards.push(newCard);
    await existingUser.save();

    existingBoard.boardCards.push(newCard);
    await existingBoard.save();

    res.status(201).json({ newCard: savedCard });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export const deleteCard = async (req, res, next) => {
  const card_id = req.params.id;
  try {
    await cards.findByIdAndDelete(card_id);

    return res.status(200).json({ message: "deleted card" });
  } catch (err) {
    return console.log(err);
  }
};

export const getallCardsByBoardId = async (req, res, next) => {
  const boardId = req.params.id;
  let currentBoard;
  try {
    currentBoard = await board.findById(boardId);
  } catch (err) {
    console.log(err);
  }

  if (!currentBoard) {
    return res.status(400).json({ message: "no such board present" });
  }

  let cards;
  try {
    cards = await board.findById(currentBoard).populate("boardCards");
  } catch (err) {
    console.log(err);
  }

  if (!cards) {
    return res.status(400).json({ message: "no such card is present" });
  }

  return res.status(200).json({
    message: cards,
  });
};

export const getAllCard = async (req, res, next) => {
  try {
    const allCards = await cards.find();
    res.status(201).json({ allCards: allCards });
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export const addList = async (req, res, next) => {
  const card_id = req.params.id;
  try {
    const model = await cards.findOne({ _id: card_id });
    if (!model) {
      return res.status(404).json({ message: "Card not found" });
    }
    const { description } = req.body;

    model.description.push(description);
    await model.save();
    console.log("added");
    res.status(201).json({ message: "List added" });
  } catch (error) {
    console.error(error);
    console.log("error");
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateListById = async (req, res, next) => {
  const card_id = req.params.id;

  const { newDescription, valueToUpdate } = req.body;

  try {
    const current_card = await cards.findById(card_id);
    console.log(current_card.description);
    const updateList = await cards.findByIdAndUpdate(
      card_id,
      {
        $set: {
          description: current_card.description.map((desc) => {
            if (desc === valueToUpdate) {
              return newDescription;
            } else {
              return desc;
            }
          }),
        },
      },
      { new: true }
    );
    res.status(201).json({ message: "updated list" });
  } catch (errr) {
    console.log(errr);

    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteFromListById = async (req, res, next) => {
  const card_id = req.params.id;
  const valueToDelete = req.body.valueToUpdate;

  try {
    const current_card = await cards.findById(card_id);
    console.log(current_card);
    console.log(valueToDelete);
    const updateList = await cards.findByIdAndUpdate(
      card_id,
      {
        $pull: {
          description: valueToDelete,
        },
      },
      { new: true }
    );
    res.status(201).json({ message: "deleted from list" });
  } catch (errr) {
    console.log(errr);
    res.status(500).json({ message: "Something went wrong" });
  }
};
