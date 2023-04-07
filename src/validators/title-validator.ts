import { body, ValidationChain } from "express-validator";
import { EMPTY_PARAM_MSG, MISSING_PARAM_MSG } from "./constants";

const TITLE = "title";
export const titleRule: ValidationChain = body(TITLE)
  .exists().withMessage(MISSING_PARAM_MSG)
  .bail()
  .notEmpty().withMessage(EMPTY_PARAM_MSG);