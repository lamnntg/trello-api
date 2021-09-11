import { boardModel } from "*/models/board.model";

const createNew = async (data) => {
  try {
    return await boardModel.createBoard(data);
  } catch (error) {
    throw new Error(error);
  }
};

const getBoard = async (boardId) => {
  try {
    console.log(typeof boardId);

    const board = await boardModel.getFullBoard(boardId.toString());

    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    delete board.cards;

    console.log(board);
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardService = { createNew, getBoard };
