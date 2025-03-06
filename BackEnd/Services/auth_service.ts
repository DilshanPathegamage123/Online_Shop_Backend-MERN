import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRepository } from "../data_access/auth_repository";
import { IUser } from "../models/user";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
  private repo: AuthRepository;

  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  // Register a new user
  async registerUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
    user_name: string;
    password: string;
    role: string;
  }): Promise<{
    user: IUser;
    token: string;
  }> {
    // Check if username already exists
    const existingUsername = await this.repo.findUserByUserName(
      userData.user_name
    );
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // Check if email already exists
    const existingEmail = await this.repo.findUserByEmail(userData.email);
    if (existingEmail) {
      throw new Error("Email already registered");
    }

    // Create new user
    const newUser = await this.repo.createUser(userData);

    // Generate token
    const token = this.generateToken(newUser);

    return {
      user: newUser,
      token,
    };
  }

  // Login user
  async loginUser(credentials: {
    user_name: string;
    password: string;
  }): Promise<{
    user: IUser;
    token: string;
  }> {
    // Find user by username
    const user = await this.repo.findUserByUserName(credentials.user_name);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Verify password
    const isPasswordValid = await this.repo.verifyPassword(
      user,
      credentials.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  // Helper method to generate JWT token
  private generateToken(user: IUser): string {
    return jwt.sign(
      {
        id: user._id,
        username: user.user_name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "30m" }
    );
  }
}

const repository = new AuthRepository();
export const auth_service = new AuthService(repository);
