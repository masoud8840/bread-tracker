export interface IResponse {
  message: string;
  status: string;
  statusCode: number;
}
export interface User {
  token: string;
  username: string;
  email: string;
  role: "Admin" | "User";
  balance: number;
}
