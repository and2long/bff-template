import { body, ValidationChain } from "express-validator";
import { titleRule } from "./title-validator";
import { introductionRule } from "./introduction-validator";
import { datetimeRule } from "./datetime-validator";

const departmentIds = "departmentIds";
const startTime = "startTime";
const endTime = "endTime";

const MISSING_DEPARTMENT_IDS_PARAM_MSG = "Missing departmentIds parameter";
const INVALID_TYPE_MSG = "Invalid parameter type";
const NOT_ARRAY_MSG = "departmentIds is not array";

const departmentIdsRule = body(departmentIds)
  .exists().withMessage(MISSING_DEPARTMENT_IDS_PARAM_MSG)
  .isArray().withMessage(NOT_ARRAY_MSG)
  .notEmpty()
  .custom((value: []) => value.every(Number.isInteger)).withMessage(INVALID_TYPE_MSG)
  .bail();

export const createAppointmentRules: ValidationChain[] = [
  titleRule,
  introductionRule,
  departmentIdsRule,
  datetimeRule(startTime),
  datetimeRule(endTime),
];