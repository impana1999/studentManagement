import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, _: any, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next(new Error("No token, authorization denied"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};
