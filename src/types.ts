export interface MessageResponse {
  message: string;
}

export interface ErrorProp {
  value: string;
  msg: string;
}
export interface ValidationErrors {
  [key: string]: ErrorProp;
}

export interface LoginPayload {
  username: string;
  password: string;
}
