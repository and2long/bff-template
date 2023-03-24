import { BusinessError } from "./business-error";
import { TechnicalError } from "./technical-error";
import { AuthorizationError } from "./authorization-error";

export type ApiError = BusinessError | TechnicalError | AuthorizationError;
