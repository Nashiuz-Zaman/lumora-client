import { TUserStatusValue } from "@/constants";
import { IRole } from "./role";
import { IUserBasic } from "./shared";

// ---------------------------------------------------------
// USER MODEL
// ---------------------------------------------------------
export interface IUser extends IUserBasic {
  _id?: string;
  displayName?: string;
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
