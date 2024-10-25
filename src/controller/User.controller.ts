import { Request, Response } from "express";
import { User } from "../model/user.model";

export const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).json("user already created");
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "created successfully",
      data: newUser.toObject(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating user" });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine, city, country } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json("user not found");
    }
    user.name = name;
    user.addressLine = addressLine;
    user.city = city;
    user.country = country;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating user" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(400).json("user not found");
    }
    return res.status(200).json({
      success: true,
      message: "current user fetched",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error getting current user" });
  }
};
