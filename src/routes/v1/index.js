import express from "express";
import { httpStatusCode } from "../../utillities/constants";
import { boardRoute } from "./board.route";
import { columnRoute } from "./column.route";
import { cardRoute } from "./card.route";

const Router = express.Router();
/**
 * GET
 * v1
 */
Router.get("/status", (req, res) => {
  res.status(httpStatusCode.OK).json({
    status: "Hello World",
  });
});

Router.use("/boards", boardRoute);
Router.use("/columns", columnRoute);
Router.use("/cards", cardRoute);

export const apiV1 = Router;
