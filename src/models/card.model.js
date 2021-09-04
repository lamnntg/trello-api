import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectID } from "mongodb";

const cardCollectionName = "cards";

const cardSchema = Joi.object({
  boardId: Joi.string().required(),

  columnId: Joi.string().required(),

  title: Joi.string().min(3).max(30).required(),

  cover: Joi.string().default(null),

  created_at: Joi.date().timestamp().default(Date.now()),

  updated_at: Joi.date().timestamp().default(null),

  __destroy: Joi.boolean().default(false),
});

const validateCard = async (data) => {
  return await cardSchema.validateAsync(data, { abortEarly: false });
};

const getCard = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectID(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createCard = async (data) => {
  try {
    const value = await validateCard(data);
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value);

    return await getCard(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};

export const cardModel = { createCard };
