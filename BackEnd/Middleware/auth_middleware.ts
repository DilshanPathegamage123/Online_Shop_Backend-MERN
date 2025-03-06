import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

//structure of the decoded JWT payload
interface DecodedToken {
  id: string;
  username: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    console.log("Headers:", req.headers);
    // Check if token exists
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    // Get token
    const token = authHeader.split(" ")[1];
    console.log("Token:", token.substring(0, 20) + "...");
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Add user from payload to request object
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check if user is admin
export const admin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
