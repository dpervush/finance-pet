import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./User/UserRouter.js";
import CardRouter from "./Card/CardRouter.js";
import CategoryRouter from "./Category/CategoryRouter.js";
import TransactionRouter from "./Transaction/TransactionRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
// app.use(express.static('static'))

app.use("/api", CardRouter);
app.use("/api", CategoryRouter);
app.use("/api", TransactionRouter);
app.use("/api", UserRouter);

app.use(errorMiddleware);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
