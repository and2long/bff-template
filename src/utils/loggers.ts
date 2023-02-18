import { NextFunction, Request, Response } from 'express';
import stringify from "fast-safe-stringify";
import _ from "lodash";

export const httpRequestLogger = (req: Request, res: Response, next: NextFunction): void => {
  let msg = `-> Incoming Request ${req.method} ${req.url}`;
  if (!_.isEmpty(req.body)) {
    msg += `, Request Body: ${stringify(req.body)}`;
  }
  console.log(msg);
  next();
};

export const httpResponseLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime();
  let msg = `<- Outgoing Response ${req.method} ${req.url},`;
  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    msg += ` Status: ${res.statusCode}, Response Time: ${durationInMilliseconds.toLocaleString()}ms`;
    console.log(msg);
  });
  next();
};

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}