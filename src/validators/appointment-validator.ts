import { body, ValidationChain } from "express-validator";
import { titleRule } from "./title-validator";
import { introductionRule } from "./introduction-validator";
import { datetimeRule } from "./datetime-validator";
import { EMPTY_PARAM_MSG, MISSING_PARAM_MSG, NOT_ARRAY_PARAM_MSG, NOT_NUMBER_ELEMENT_MSG } from "./constants";

const departmentIds = "departmentIds";
const startTime = "startTime";
const endTime = "endTime";

const departmentIdsRule = body(departmentIds)
  .exists().withMessage(MISSING_PARAM_MSG)
  .bail()
  .isArray().withMessage(NOT_ARRAY_PARAM_MSG)
  .bail()
  .notEmpty().withMessage(EMPTY_PARAM_MSG)
  .bail()
  .custom((value: []) => value.every(Number.isInteger)).withMessage(NOT_NUMBER_ELEMENT_MSG);

export const createAppointmentRules: ValidationChain[] = [
  titleRule,
  introductionRule,
  departmentIdsRule,
  datetimeRule(startTime),
  datetimeRule(endTime),
];