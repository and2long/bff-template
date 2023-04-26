import { BusinessError } from "./business-error";
import { TechnicalError } from "./technical-error";
import { AuthorizationError } from "./authorization-error";
import { ValidationError } from "./validation-error";

export type ApiError = BusinessError | TechnicalError | AuthorizationError | ValidationError;
