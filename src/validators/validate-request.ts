import { HTTPStatusCode, ValidationError } from "@and2long/lib-commons";
import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const invalidParams = errors.array().map((item: any) => {
      return { name: item.param, reason: item.msg };
    });
    res.status(HTTPStatusCode.BAD_REQUEST).json(new ValidationError(invalidParams));
  };
};