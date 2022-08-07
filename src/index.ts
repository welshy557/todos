import express, { Response, Request } from "express";
import cors from "cors";

import user, { User } from "./routes/users";
import auth from "./routes/auth";
import todo from "./routes/todo";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
export interface ApiRequest extends Request {
  user?: User;
}
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(user);
app.use(auth);
app.use(todo);

app.get("/", (req, res) => res.status(200).send("Running"));

app.listen(port, () => console.log(`Server running on port ${port}`));
