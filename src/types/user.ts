import { TUserStatusValue } from "@/constants";
import { IRole } from "./role";

// ---------------------------------------------------------
// USER MODEL
// ---------------------------------------------------------
export interface IUser {
  _id?: string;
  displayName?: string;
  name?: string;
  email: string;
  phone?: string;
  image?: string;

  isVerified: boolean;
  status: TUserStatusValue;

  role: string | IRole;

  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ---------------------------------------------------------
// POPULATED USER 
// ---------------------------------------------------------
export interface IUserPopulated extends IUser {
  role: IRole;
}
