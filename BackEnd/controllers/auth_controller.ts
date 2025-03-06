import { Request, Response } from "express";
import { auth_service } from "../Services/auth_service";

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, user_name, password, role } =
      req.body;

    const result = await auth_service.registerUser({
      first_name,
      last_name,
      email,
      user_name,
      password,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: result.token,
      user: {
        id: result.user._id,
        first_name: result.user.first_name,
        last_name: result.user.last_name,
        email: result.user.email,
        user_name: result.user.user_name,
        role: result.user.role,
      },
    });
  } catch (error: any) {
    // Handle different error types with appropriate status codes
    if (
      error.message.includes("already exists") ||
      error.message.includes("already registered")
    ) {
      res.status(400).json({ message: error.message });
    } else {
      console.error("Registration error:", error);
      res.status(500).json({ message: error.message });
    }
  }
};

// Login user
// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_name, password } = req.body;

    const result = await auth_service.loginUser({
      user_name,
      password,
    });

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: {
        id: result.user._id,
        first_name: result.user.first_name,
        last_name: result.user.last_name,
        email: result.user.email,
        user_name: result.user.user_name,
        role: result.user.role,
      },
    });
  } catch (error: any) {
    if (error.message === "Invalid username or password") {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Login error:", error);
      res.status(500).json({ message: error.message });
    }
  }
};
