import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./api/routes/index";
import connect from "./configs/dbConnection";

import listEndpoints from 'express-list-endpoints';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Eventify Server");
});

app.use("/api", routes);


app.listen(port, async () => {
  await connect();
  console.log(`Server is running at http://localhost:${port}`);
});

console.log(listEndpoints(app as any));
