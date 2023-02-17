import { NextFunction } from "express";
import stringify from "fast-safe-stringify";
import _ from "lodash";

export const httpRequestLogger = (req: Request, res: Response, next: NextFunction): void => {
  if (req.url.endsWith("/healthz")) {
    next();
    return;
  }
  let msg = `-> Incoming Request ${req.method} ${req.url}`;
  if (!_.isEmpty(req.body)) {
    msg += `, Request Body: ${stringify(req.body)}`;
  }
  console.log(msg);
  next();
};
