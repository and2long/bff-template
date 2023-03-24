import { ApiError } from "./error-response";

export const serializeError = (err: ApiError): any => {
  return { ...err };
};
