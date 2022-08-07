import express, { Response, Request } from "express";
import bcrypt from "bcrypt";

import authenticateToken from "../middleware/auth-token";
import matchUserId from "../middleware/match-user";
import db from "../../db/db";

const todo = express.Router();

todo.get(
  "/todos/:userId",
  authenticateToken,
  matchUserId,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const todo = await db("todos").select().where({ user_id: userId });
      res.status(200).send(todo);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

todo.post(
  "/todos/:userId",
  authenticateToken,
  matchUserId,
  async (req: Request, res: Response) => {
    try {
      await db("todos").insert({ ...req.body, user_id: req.params.userId });
      res.status(200).send("Success");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

todo.delete(
  "/todos/:userId/:id",
  authenticateToken,
  matchUserId,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await db("todos").where({ id: id }).del();
      res.status(200).send("Success");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
export default todo;
