import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 20,
    },
    description: [
      {
        type: String,
        required: true,
        max: 100,
      },
    ],
    ourUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ourBoard: {
      type: mongoose.Types.ObjectId,
      ref: "Boards",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("cards", cardSchema);
