import { columnModel } from "../models/column.model";
import { boardModel } from "../models/board.model";
import { cardModel } from "../models/card.model";
import { ObjectId } from "mongodb";

const createColumn = async (data) => {
  const column = await columnModel.createColumn(data);
  column.cards = [];
  await boardModel.pushColumnOrder(
    column.boardId.toString(),
    column._id.toString()
  );

  return column;
};

const update = async (id, data) => {
  try {
    delete data._id;
    delete data.cards;

    if (data.__destroy) {
      //update card to destroy
      await cardModel.deleteManyCard(data.cardOrder);
    }
    let params = {
      ...data,
      updated_at: Date.now(),
    };

    if (data.boardId) {
      params.boardId = ObjectId(data.boardId);
    }

    const result = await columnModel.updateColumn(id, params);
    //test get card by columnId
    // const cards = await cardModel.getCardByColumnId(id);
    return result;
  } catch (error) {
    return error;
  }
};

export const columnService = { createColumn, update };
