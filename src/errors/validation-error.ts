import { BaseError } from "./base-error";
import { ApiErrorType } from "./api-error-type";

export type InvalidParam = {
  name: string;
  reason: string;
}

export class ValidationError extends BaseError {
  readonly invalidParams: InvalidParam[];

  constructor(invalidParams: InvalidParam[], id?: string) {
    super(400, ApiErrorType.validation, undefined, id);
    this.invalidParams = invalidParams;
  }
}
