import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Route/user.route";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DB as string)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error while connecting database " + err));

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health ok!" });
});

app.use("/api/my/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`server started successfully at ${process.env.PORT}`);
});
