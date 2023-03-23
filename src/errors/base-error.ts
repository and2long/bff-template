import { ApiErrorType } from "./api-error-type";
import { v4 as uuidv4 } from "uuid";

export class BaseError extends Error {
  readonly id: string;
  readonly status: number;
  readonly type: ApiErrorType;

  constructor(message: string, status: number, type: ApiErrorType, id?: string) {
    super(message);
    this.id = id || uuidv4();
    this.status = status;
    this.type = type;
  }
}
