import { check, validationResult } from "express-validator";

export const checkForSignup = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("emailId").isEmail().withMessage("valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password mush be at least 6 character long"),
];

export const checkForSignin = [
  check("emailId").isEmail().withMessage("valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password mush be at least 6 character long"),
];

export const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
