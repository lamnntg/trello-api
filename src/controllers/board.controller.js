import { boardService } from "*/services/board.service";
import { httpStatusCode } from "*/utillities/constants";

const createNew = async (req, res) => {
  try {
    const result = await boardService.createNew(req.body);
    console.log(result);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
  console.log(req.body);
};

const getFullBoard = async (req, res) => {
  try {
    const result = await boardService.getBoard(req.params.id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

export const boardController = { createNew, getFullBoard };
