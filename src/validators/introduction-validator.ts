import { body, ValidationChain } from "express-validator";
import { EMPTY_PARAM_MSG, MISSING_PARAM_MSG } from "./constants";

const INTRODUCTION = "introduction";
export const introductionRule: ValidationChain = body(INTRODUCTION)
  .exists().withMessage(MISSING_PARAM_MSG)
  .bail()
  .notEmpty().withMessage(EMPTY_PARAM_MSG);