import { BaseError } from "./base-error";
import { ApiErrorType } from "./api-error-type";

export class TechnicalError extends BaseError {

  constructor(message: string, id?: string) {
    super(message, 500, ApiErrorType.technical, id);
  }
}
