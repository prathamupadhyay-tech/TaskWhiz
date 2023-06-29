import user from "../models/user.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const { emailId, password } = req.body;

    if (user.authenticate(password)) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const {
        _id,
        firstName,
        lastName,
        emailId,
        socialLinks,
        skills,
        userCards,
        userBoards,
      } = user;

      return res.status(200).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          emailId,
          socialLinks,
          skills,
          userCards,
          userBoards,
        },
        message: "Logged in",
      });
    } else {
      return res.status(400).json({
        message: "Wrong password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res, next) => {
  const { firstName, lastName, emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password,
      username: Math.random().toString(),
    });

    const data = await newUser.save();
    console.log(data);
    return res.status(201).json({
      user: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUserById = async (req, res, next) => {
  const currUser = req.params.id;
  const { socialLinks, skills } = req.body;

  try {
    if (!currUser) {
      return res.status(400).json({ message: "No such user" });
    }

    let updatedUser;

    if (socialLinks || skills) {
      const updatedFields = {};

      if (socialLinks) {
        updatedFields.socialLinks = socialLinks;
      }

      if (skills) {
        // Fetch the existing user
        const existingUser = await User.findById(currUser);

        // Remove duplicates from the new skills array
        const uniqueSkills = [...new Set(skills)];

        // Filter out existing skills from the new skills
        const filteredSkills = uniqueSkills.filter(
          (skill) => !existingUser.skills.includes(skill)
        );

        // Merge existing skills with filtered new skills
        existingUser.skills = [...existingUser.skills, ...filteredSkills];

        // Save the updated user
        updatedUser = await existingUser.save();
      }

      updatedUser = await User.findByIdAndUpdate(currUser, updatedFields, {
        new: true,
      });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
