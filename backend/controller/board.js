import board from "../models/board.js";
import user from "../models/user.js";

export const getBoardsByUserId = async (req, res, next) => {
  const ourUser = req.params.id;

  let existingUser;
  try {
    existingUser = await user.findById(ourUser);
    console.log(existingUser);
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "no such user" });
  }

  let boards;
  try {
    boards = await existingUser.populate("userBoards");
  } catch (err) {
    return console.log(err);
  }

  if (!boards) {
    return res.status(400).json({ message: "there is no boards to show" });
  }
  return res.status(200).json({ message: boards.userBoards });
};

export const addBoard = async (req, res, next) => {
  const { title, description, boardColor, ourUser } = req.body;

  if (!title || !description ) {
    return res.status(400).json({ message: "something went wrong" });
  }
  let existingUser;
  try {
    existingUser = await user.findById(ourUser);
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "There is no such user" });
  }

  try {
    const newBoard = new board({ title, description,boardColor, ourUser });
    const savedBoard = await newBoard.save();
    existingUser.userBoards.push(savedBoard);
    await existingUser.save();
    res.status(201).json({ newBoard: savedBoard });
  } catch (err) {
    res
      .status(400)
      .json({ message: "something went wrong please try again later" });
  }
};
export const deleteBoardById = async (req, res, next) => {
  const boardId = req.params.id;
  let deletedDocument;
  try {
    deletedDocument = await board.findByIdAndDelete(boardId);

    if (!deletedDocument) {
      return res.status(400).json({ message: "document not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }

  return res.status(200).json({ message: "deleted Document" });
};
