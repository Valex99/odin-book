import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!process.env.TOKEN_SECRET) return res.sendStatus(500);

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "No token provided" });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,

    // User is the payload of the JWT token
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      // Temporary workaround until types are added
      (req as any).user = user;

      next();
    }
  );
}
