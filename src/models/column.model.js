import Joi from "joi";
import { getDB } from "*/config/mongodb";

const columnCollectionName = "columns";

const columnSchema = Joi.object({
  boardId: Joi.string().required(),

  title: Joi.string().alphanum().min(3).max(30).required(),

  cardOrder: Joi.array().items(Joi.string()).default([]),

  created_at: Joi.date().timestamp().default(Date.now()),

  updated_at: Joi.date().timestamp().default(null),

  __destroy: Joi.boolean().default(false),
});

const validateColumn = async (data) => {
  // return all error of validation
  return await columnSchema.validateAsync(data, { abortEarly: false });
};

const getColumn = async (id) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createColumn = async (data) => {
  try {
    const value = await validateColumn(data);
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);

    return await getColumn(result.insertedId);
  } catch (error) {
    console.log(error);
  }
};

export const columnModel = { createColumn };
