import Joi from "joi";
import { httpStatusCode } from "*/utillities/constants";

const createNew = async (req, res, next) => {
  const columnValidation = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
  });

  try {
    await columnValidation.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: new Error(err.message).message,
    });
  }
};

const update = async (req, res, next) => {
  const columnValidation = Joi.object({
    title: Joi.string().min(3).max(30),
  });

  try {
    await columnValidation.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    });
    next();
  } catch (err) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: new Error(err.message).message,
    });
  }
};

export const columnValidation = { createNew, update };