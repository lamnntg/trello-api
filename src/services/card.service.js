import { cardModel } from "*/models/card.model";
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

export const cardService = { createNew };
