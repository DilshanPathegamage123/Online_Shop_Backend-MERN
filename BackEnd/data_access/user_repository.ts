import User, { IUser } from "../models/user";

export class UserRepository {
  //Get all users
  async findAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  //Get single user by id
  async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
}
