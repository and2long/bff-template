import { BaseError } from "./base-error";
import { ApiErrorType } from "./api-error-type";

export class BusinessError extends BaseError {
  readonly code: string;

  constructor(message: string, code: string, id?: string) {
    super(message, 400, ApiErrorType.business, id);
    this.code = code;
  }
}
