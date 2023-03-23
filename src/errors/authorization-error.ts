import { BaseError } from "./base-error";
import { ApiErrorType } from "./api-error-type";

export class AuthorizationError extends BaseError {

  constructor(message: string, id?: string) {
    super(message, 401, ApiErrorType.authorization, id);
  }
}
