import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "*/config/mongodb";

const columnCollectionName = "columns";

const columnSchema = Joi.object({
  boardId: Joi.string().required(),

  title: Joi.string().min(3).max(30).trim().required(),

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
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createColumn = async (data) => {
  try {
    const validatedValue = await validateColumn(data);

    const value = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
    }
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);

    return await getColumn(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};

const updateColumn = async (id, data) => {
  console.log(data);
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: id },
        { $set: data },
        { returnOriginal: false }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnOriginal: false }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export const columnModel = { createColumn, updateColumn, pushCardOrder };
