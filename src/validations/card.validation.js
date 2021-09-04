import Joi from "joi";
import { httpStatusCode } from "../utillities/constants";

const createNew = async (req, res, next) => {
  const cardCondition = Joi.object({
    boardId: Joi.string().required(),

    columnId: Joi.string().required(),

    title: Joi.string().min(3).max(30).required(),
  });

  try {
    await cardCondition.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: new Error(error).message,
    });
  }
};

export const cardValidation = { createNew };
