import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectId } from "mongodb";

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
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createCard = async (data) => {
  try {
    const validatedValue = await validateCard(data);
    const value = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    }
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(value);

    return await getCard(result.insertedId);
  } catch (error) {
    throw new Error(error);
  }
};


const getCardByColumnId = async (columnId) => {
  console.log(columnId);
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .find( 
        { "columnId": ObjectId('613cec42b406417b13c2d9a3') }
      )
      .toArray();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 
 * @param {array} ids 
 * @returns 
 */
const deleteManyCard = async (ids) => {
  try {
    const arrIds = ids.map(id => ObjectId(id));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany(
        { _id: { $in: arrIds } },
        { $set: { __destroy: true } }
      );
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}


export const cardModel = { createCard, getCardByColumnId, deleteManyCard };
