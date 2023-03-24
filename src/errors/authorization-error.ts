import { BaseError } from "./base-error";
import { ApiErrorType } from "./api-error-type";

export class AuthorizationError extends BaseError {

  constructor(message: string, id?: string) {
    super(401, ApiErrorType.authorization, message, id);
  }
}
