import { TUserStatusValue } from "@/constants";
import { ICustomer } from "./customer";
import { IAdmin } from "./admin";
import { IRole } from "./role";

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
  customerProfile?: ICustomer;
  adminProfile?: IAdmin;

  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TUserPopulated = IUser & {
  customerProfile?: ICustomer;
  adminProfile?: IAdmin;
  role: IRole;
};
