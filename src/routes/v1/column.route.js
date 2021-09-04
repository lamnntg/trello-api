import express from "express";
import { columnController } from "*/controllers/column.controller";
import { columnValidation } from "*/validations/column.validation";

const router = express.Router();

router.route("/create").post(columnValidation.createNew, columnController.createColumn);

router.route("/update/:id")
  .put(columnValidation.update, columnController.update);


export const columnRoute = router;
