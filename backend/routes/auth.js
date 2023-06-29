import express from "express";
import { check } from "express-validator";
import {
  checkForSignin,
  checkForSignup,
  isRequestValidated,
} from "../validators/authValidator.js";
import { signin, signup, updateUserById } from "../controller/auth.js";
const userRouter = express.Router();

userRouter.post("/signin", checkForSignin, isRequestValidated, signin);
userRouter.post("/signup", checkForSignup, isRequestValidated, signup);
userRouter.post("/updateUser/:id", updateUserById);
// userRouter.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({
//     user: "profile",
//   });
// });

export default userRouter;
