export interface UserCreationPayload {
  userId: string;
  username: string;
}

export interface UserCreationRequest {
  username: string;
  password: string;
}

export interface UserCreationResponse {
  userId: string;
}
