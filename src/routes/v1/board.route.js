import express from "express";
import { boardController } from "*/controllers/board.controller";
import { boardValidation } from "*/validations/board.validation";

const router = express.Router();

router.route("/create").post(boardValidation.createNew, boardController.createNew);
router.route("/:id").get(boardController.getFullBoard);

export const boardRoute = router;
