import { ApiError } from "./error-response";
import { NextFunction, Request, Response } from "express";
import { serializeError } from "./error-serializer";
import { ApiErrorType } from "./api-error-type";
import { TechnicalError } from "./technical-error";
import { BusinessError } from "./business-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const apiError: ApiError = transformToApiError(err);
  res.status(apiError.status);
  res.json(serializeError(apiError));
};

const isTechnicalOrUnknownError = (err: any): boolean => {
  const status = err.status || 500;
  return status >= 500;
};

const isUnhandledBadRequestError = (err: any): boolean => {
  return err.status === 400 && !Object.values(ApiErrorType).includes(err.type);
};

const transformToApiError = (err: any): ApiError => {
  if (isTechnicalOrUnknownError(err)) {
    return new TechnicalError();
  }

  if (isUnhandledBadRequestError(err)) {
    return new BusinessError(
      err.body,
      ""
    );
  }

  return err;
};

