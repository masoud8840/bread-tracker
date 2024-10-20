export interface IResponse {
  message: string;
  status: string;
  statusCode: number;
}
export interface IUser {
  _id: string;
  token: string;
  username: string;
  email: string;
  role: "Admin" | "User";
  balance: number;
  negativeToday: number;
  negativeTotal: number;
}

export interface IBread {
  type: EBreadTypes;
  qty: number;
  date: string;
  total: number
}

export enum EBreadTypes {
  Sangak = "سنگک",
  Taftoon = "تافتون",
  Barbari = "بربری",
}
