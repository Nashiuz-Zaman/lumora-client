import { TUserStatusValue } from "@/constants";
import { ICustomer } from "./customer";
import { IAdmin } from "./admin";
import { IRole } from "./role";

export interface IUser {
  id: string;
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

  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserPopulated = IUser & {
  customerProfile?: ICustomer;
  adminProfile?: IAdmin;
  role: IRole;
};
