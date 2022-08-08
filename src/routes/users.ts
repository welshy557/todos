import express, { Response, Request } from "express";
import bcrypt from "bcrypt";

import authenticateToken from "../middleware/auth-token";
import db from "../../db/db";
import { ApiRequest } from "..";

export interface DBUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const user = express.Router();

user.get("/users", async (req: Request, res: Response) => {
  const users = await db("users").select(
    "id",
    "first_name",
    "last_name",
    "email"
  );
  res.status(200).send(users);
});

user.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db("users")
      .select("id", "first_name", "last_name", "email")
      .where({ id: id })
      .first();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

user.post("/users", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    await db("users").insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    res.status(200).send("Success");
  } catch (err) {
    res.status(500).send(err);
  }
});

user.put(
  "/users/:id",
  authenticateToken,
  async (req: ApiRequest, res: Response) => {
    try {
      const { id } = req.params;
      if (req.body.password) {
        const password = await bcrypt.hash(req.body.password, 10);
        await db("users")
          .where({ id: id })
          .update({ ...req.body, password: password });
      } else {
        await db("users").where({ id: id }).update(req.body);
      }
      res.status(200).send("Success");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

export default user;
