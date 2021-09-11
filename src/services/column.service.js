import { columnModel } from "../models/column.model";
import { boardModel } from "../models/board.model";

const createColumn = async (data) => {
  const column = await columnModel.createColumn(data);
  await boardModel.pushColumnOrder(column.boardId.toString(), column._id.toString());

  return column;
};

const update = async (id, data) => {
  const params = {
    ...data,
    updatedAt: Date.now(),
  };
  const result = await columnModel.updateColumn(id, params);
  return result;
};

export const columnService = { createColumn, update };
