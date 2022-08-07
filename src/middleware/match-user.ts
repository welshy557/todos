import { NextFunction, Response } from "express";
import { ApiRequest } from "../index";

const matchUserId = (req: ApiRequest, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (userId !== req.user?.id) {
    return res.status(403).send("Unauthorized");
  }

  next();
};

export default matchUserId;
