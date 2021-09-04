import express from "express";
import { cardController } from "*/controllers/card.controller";
import { cardValidation } from "*/validations/card.validation";

const router = express.Router();

router.route("/create").post(cardValidation.createNew, cardController.createNew);

export const cardRoute = router;
