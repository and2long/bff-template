import { ValidationChain, body } from "express-validator";

const TITLE = "title";
const MISSING_PARAM_MSG = "Missing title parameter.";
export const titleRule: ValidationChain = body(TITLE)
  .exists()
  .withMessage(MISSING_PARAM_MSG)
  .notEmpty()
  .bail();