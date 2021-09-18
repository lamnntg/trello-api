import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";

const boardCollectionName = "boards";

const boardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),

  columnOrder: Joi.array().items(Joi.string()).default([]),

  created_at: Joi.date().timestamp().default(Date.now()),

  updated_at: Joi.date().timestamp().default(null),

  __destroy: Joi.boolean().default(false),
});

const validateBoard = async (data) => {
  // return all error of validation
  return await boardSchema.validateAsync(data, { abortEarly: false });
};

const getBoard = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getFullBoard = async (id) => {
  try {
    const result = await getDB().collection(boardCollectionName)
      .aggregate([
        { $match: { 
          _id: ObjectId(id), 
          __destroy: false
        } },
        // { $addFields: { _id: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();
    return result[0] || {};
  } catch (error) {
    console.log(error);
  }
};

const createBoard = async (data) => {
  try {
    const value = await validateBoard(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);

    return await getBoard(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};

const updateBoard = async (id, data) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnOriginal: false }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export const boardModel = { createBoard, getFullBoard, pushColumnOrder, updateBoard };
