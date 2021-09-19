import express from "express";
import { mapOrder } from "*/utillities/sort";
import { connectDB, getDB } from "*/config/mongodb";
import { env } from "*/config/environtments";
import { boardModel } from "*/models/board.model";
import { apiV1 } from "*/routes/v1";
import cors from "cors";

connectDB()
  .then(() => {
    console.log("connected db server");
  })
  .then(() => {
    bootServer();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const bootServer = () => {
  const app = express();
  // body-paser
  app.use(express.json());
  //dev
  // var corsOptions = {
  //   origin: "http://localhost:3000",
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }

  //deploy
  var corsOptions = {
    origin: "https://trello-lamnntug.web.app",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));

  app.use("/v1", apiV1);
  // app.get("/", async (req, res) => {
  //   const dbIntance = getDB();

  //   await dbIntance.collection("boards").insertOne({
  //     title: "lammngyuyen",
  //   });
  //   res.end("<h1>Hello World!<h1>");
  // });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`hello ${env.APP_HOST}:${env.APP_PORT}`);
  });
};
