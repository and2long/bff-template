import { body, ValidationChain } from "express-validator";
import { INVALID_TYPE_MSG, MISSING_PARAM_MSG } from "./constants";

export const datetimeRule = (param: string): ValidationChain => body(param)
  .exists().withMessage(MISSING_PARAM_MSG)
  .bail()
  .isDate().withMessage(INVALID_TYPE_MSG);