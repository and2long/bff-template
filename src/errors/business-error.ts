import { BaseError } from "./base-error";
import { ApiErrorType } from "./api-error-type";

export class BusinessError extends BaseError {
  readonly code: string;

  constructor(message: string, code: string, id?: string) {
    super(400, ApiErrorType.business, message, id);
    this.code = code;
  }
}
