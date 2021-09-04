import { columnModel } from "../models/column.model";

const createColumn = async (data) => {
  const result = await columnModel.createColumn(data);
  return result;
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
