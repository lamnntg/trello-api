import { cardService } from "*/services/card.service";
import { httpStatusCode } from "*/utillities/constants";

const createNew = async (req, res) => {
  try {
    const result = await cardService.createNew(req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: new Error(error).message });
  }
};

export const cardController = { createNew };
