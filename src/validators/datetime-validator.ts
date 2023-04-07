import { body, ValidationChain } from "express-validator";

const MISSING_PARAM_MSG = "Missing parameter.";
const INVALID_TYPE_MSG = "Invalid parameter type";
export const datetimeRule = (param: string): ValidationChain => body(param)
  .exists().withMessage(MISSING_PARAM_MSG)
  .isDate().withMessage(INVALID_TYPE_MSG)
  .bail();