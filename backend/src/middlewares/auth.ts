import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, UserPayload } from "../types/express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Auth middleware triggered");
  console.log("All headers:", req.headers);
  console.log("Authorization header:", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token from authMiddleware:", token);

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & UserPayload;

    console.log("Decoded token:", decoded);

    (req as AuthenticatedRequest<{}, {}, {}>).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
