import { boardService } from "*/services/board.service";
import { httpStatusCode } from "*/utillities/constants";

const createNew = async (req, res) => {
  try {
    const result = await boardService.createNew(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

const getFullBoard = async (req, res) => {
  try {
    const result = await boardService.getBoard(req.params.id);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const updateBoard = async (req, res) => {
  try {
    const result = await boardService.updateBoard(req.params.id, req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

export const boardController = { createNew, getFullBoard, updateBoard };
