import { ApiError } from "@and2long/lib-commons";

export const serializeError = (err: ApiError): any => {
  return { ...err };
};
