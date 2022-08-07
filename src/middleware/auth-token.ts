import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DBUser, User } from "../routes/users";
import { ApiRequest } from "../index";
import dotenv from "dotenv";
dotenv.config();

const authenticateToken = (
  req: ApiRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const token = authorization && authorization?.split(" ")[1];
  if (token == null) {
    return res.status(403).send("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) {
      return res.status(403).send("Unauthorized");
    }
    req.user = user as any;
    next();
  });
};

export default authenticateToken;
