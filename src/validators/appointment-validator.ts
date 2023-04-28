import { body, ValidationChain } from "express-validator";
import { titleRule } from "./title-validator";
import { introductionRule } from "./introduction-validator";
import { datetimeRule } from "./datetime-validator";
import {
  EMPTY_PARAM_MSG,
  MISSING_PARAM_MSG,
  NOT_ARRAY_PARAM_MSG,
  NOT_NUMBER_ELEMENT_MSG,
  NOT_UUID_ELEMENT_MSG
} from "./constants";
import validator from "validator";
import isUUID = validator.isUUID;

const DEPARTMENT_IDS_PARAM_NAME = "departmentIds";
const START_TIME_PARAM_NAME = "startTime";
const END_TIME_PARAM_NAME = "endTime";
const PARTICIPANT_IDS_PARAM_NAME = "participantIds";

const departmentIdsRule = body(DEPARTMENT_IDS_PARAM_NAME)
  .exists().withMessage(MISSING_PARAM_MSG)
  .bail()
  .isArray().withMessage(NOT_ARRAY_PARAM_MSG)
  .bail()
  .notEmpty().withMessage(EMPTY_PARAM_MSG)
  .bail()
  .custom((value: []) => value.every(Number.isInteger)).withMessage(NOT_NUMBER_ELEMENT_MSG);

const participantIdsRule = body(PARTICIPANT_IDS_PARAM_NAME)
  .optional()
  .isArray().withMessage(NOT_ARRAY_PARAM_MSG)
  .bail()
  .custom((value: []) => value.every((e => isUUID(e)))).withMessage(NOT_UUID_ELEMENT_MSG);

export const createAppointmentRules: ValidationChain[] = [
  titleRule,
  introductionRule,
  departmentIdsRule,
  participantIdsRule,
  datetimeRule(START_TIME_PARAM_NAME),
  datetimeRule(END_TIME_PARAM_NAME),
];