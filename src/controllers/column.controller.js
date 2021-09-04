import { columnService } from "../services/column.service";
import { httpStatusCode } from "../utillities/constants";

const createColumn = async (req, res) => {
  try {
    const result = await columnService.createColumn(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
  console.log(req.body);
}

const update = async (req, res) => {
  try {
    const { id } = req.params.id;
    const result = await columnService.update(id, req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
}

export const columnController = { createColumn, update };