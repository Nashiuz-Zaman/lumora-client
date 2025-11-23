import { IUser } from "./user";

export interface IAdmin {
  id?: string;
  userId: IUser["_id"];
}

declare module "./user" {
  interface IUserPopulated {
    adminDetails?: IAdmin;
  }
}
