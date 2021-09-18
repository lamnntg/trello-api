import { cardModel } from "*/models/card.model";
import { ObjectId } from "bson";
import { columnModel } from "../models/column.model";

const createNew = async (data) => {
  try {
    const result = await cardModel.createCard(data);
    await columnModel.pushCardOrder(
      result.columnId.toString(),
      result._id.toString()
    );

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateCard = async (id, data) => {
  try {
    let params = {
      ...data,
    }
    if (data.columnId) {params.columnId = ObjectId(data.columnId)}
    if (data.boardId) {params.boardId = ObjectId(data.boardId)}
    delete params._id;
    const result = await cardModel.updateCard(id, params);

    return result;
  } catch (error) {
    return error;
  }
};

export const cardService = { createNew, updateCard };
