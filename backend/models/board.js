import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 20,
    },
    description: {
      type: String,
      required: true,
    },
    boardColor: {
      type: String,
      required: true,
    },
    ourUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boardCards: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "cards",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Boards", boardSchema);
