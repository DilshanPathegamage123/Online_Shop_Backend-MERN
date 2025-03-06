import { Request, Response } from "express";
import { user_service } from "../Services/user_service";

//Get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await user_service.findAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Get single user
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const singleUser = await user_service.findUserById(req.params.id);
    res.status(200).json(singleUser);
  } catch (error: any) {
    res.status(500).json({ message: error.messsage });
  }
};
