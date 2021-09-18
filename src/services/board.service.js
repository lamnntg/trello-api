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
    const board = await boardModel.getFullBoard(boardId.toString());
    // handle not use lodash by lamnguyen too young buffalo
    board.columns = board.columns.filter((column) => {
      return !column.__destroy
    });
    // board.columns.forEach((column, index) => {
    //   if (column.__destroy) {
    //     board.columns.splice(index, 1);
    //   }
    // });
    
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    delete board.cards;

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBoard = async (boardId, boardContent) => {
  try {
    const boardUpdate = {
      ...boardContent,
      updated_at: Date.now(),
    };

    if (boardUpdate._id) {
      delete boardUpdate._id;
    }
    if (boardUpdate.columns) {
      delete boardUpdate.columns;
    }
    const board = await boardModel.updateBoard(boardId, boardUpdate);

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardService = { createNew, getBoard, updateBoard };
