import { cardModel } from "*/models/card.model";

const createNew = async (data) => {
  try {
    return await cardModel.createCard(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const cardService = { createNew };
