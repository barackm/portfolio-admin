import { IRole } from './role';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: string;
  createdAt: string;
  verificationToken?: string | null;
  roleObjects: IRole[];
  avatarUrl?: string;
  isVerified?: true;
  resetPasswordExpires: null;
  resetPasswordToken: null;
}
