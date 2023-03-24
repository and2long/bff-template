import { ApiErrorType } from "./api-error-type";
import { v4 as uuidv4 } from "uuid";

export class BaseError extends Error {
  readonly id: string;
  readonly status: number;
  readonly type: ApiErrorType;

  constructor(status: number, type: ApiErrorType, message: string | undefined, id = "") {
    super(message || "");
    this.id = id || uuidv4();
    this.status = status;
    this.type = type;
    Object.defineProperty(this, "id", {
      writable: false,
    });
    Object.defineProperty(this, "message", {
      enumerable: true,
      writable: false,
    });
    Object.defineProperty(this, "status", {
      enumerable: false,
      writable: false,
    });
    Object.defineProperty(this, "type", {
      writable: false,
    });
  }
}
