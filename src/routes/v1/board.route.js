import express from "express";
import { boardController } from "*/controllers/board.controller";
import { boardValidation } from "*/validations/board.validation";

const router = express.Router();

router.route("/create")
  .post(boardValidation.createNew, boardController.createNew);
router.route("/:id").get(boardController.getFullBoard);
router.route("/update/:id").put(boardValidation.update, boardController.updateBoard);

export const boardRoute = router;
