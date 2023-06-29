import mongoose from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    socialLinks: {
      type: {
        linkedin: {
          type: String,
        },
        instagram: {
          type: String,
        },
        youtube: {
          type: String,
        },
        facebook: {
          type: String,
        },
      },
      default: {},
    },
    skills: [
      {
        type: String,
      },
    ],
    userCards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "cards",
        required: true,
      },
    ],
    userBoards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Boards",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

export default mongoose.model("User", userSchema);
