import { HTTPStatusCode } from "../constants/http-response";

export interface UserCreationPayload {
  userId: string;
  username: string;
}

export interface UserCreationRequest {
  username: string;
  password: string;
}

export interface KeycloakUserCreationResponse {
  code: HTTPStatusCode;
  userId?: string;
  errorMessage?: string;
}
