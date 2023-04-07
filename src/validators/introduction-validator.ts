import { ValidationChain, body } from "express-validator";

const INTRODUCTION = "introduction";
const MISSING_PARAM_MSG = "Missing introduction parameter.";
export const introductionRule: ValidationChain = body(INTRODUCTION)
  .exists()
  .withMessage(MISSING_PARAM_MSG)
  .notEmpty()
  .bail();