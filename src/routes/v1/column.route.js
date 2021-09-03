import express from "express";
import { boardController } from "*/controllers/board.controller";
import { boardValidation } from "*/validations/board.validation";

const router = express.Router();

router.route("/").post(boardValidation.createNew, boardController.createNew);

export const boardRoute = router;
