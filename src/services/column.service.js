import { columnModel } from "../models/column.model";

const createColumn = async (data) => {
  const result = await columnModel.createColumn(data);
}