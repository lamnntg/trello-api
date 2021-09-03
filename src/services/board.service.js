import { boardModel } from "*/models/board.model";

const createNew = async (data) => {
  try {
    return await boardModel.createBoard(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const boardService = { createNew };
