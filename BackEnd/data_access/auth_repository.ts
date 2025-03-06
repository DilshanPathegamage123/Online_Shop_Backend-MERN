import User, { IUser } from "../models/user";

export class AuthRepository {
  //Register User
  /// Find user by user name
  async findUserByUserName(user_name: string): Promise<IUser | null> {
    return await User.findOne({ user_name });
  }

  /// find uder by email
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  // Save new user
  async createUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
    user_name: string;
    password: string;
    role: string;
  }): Promise<IUser> {
    const newUser = new User(userData);
    return await newUser.save();
  }

  // Verify password
  async verifyPassword(user: IUser, password: string): Promise<boolean> {
    return await user.comparePassword(password);
  }
}
