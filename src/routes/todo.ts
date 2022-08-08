import express, { Response, Request } from "express";
import bcrypt from "bcrypt";

import authenticateToken from "../middleware/auth-token";
import db from "../../db/db";
import { ApiRequest } from "..";

interface Todo {
  todo: string;
  completed: boolean;
}

const todo = express.Router();

todo.get(
  "/todos",
  authenticateToken,
  async (req: ApiRequest, res: Response) => {
    try {
      const todo = await db("todos").select().where({ user_id: req.user?.id });
      res.status(200).send(todo);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

todo.post(
  "/todos",
  authenticateToken,
  async (req: ApiRequest, res: Response) => {
    try {
      await db("todos").insert({ ...req.body, user_id: req.user?.id });
      res.status(200).send("Success");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

todo.put(
  "/todos/:id",
  authenticateToken,
  async (req: ApiRequest, res: Response) => {
    try {
      const { id } = req.params;

      await db("todos").where({ id: id }).update(req.body);

      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

todo.delete(
  "/todos/:id",
  authenticateToken,
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
