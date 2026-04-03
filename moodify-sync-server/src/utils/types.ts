import { Document } from "mongoose";

interface IUserToken {
  _id: string;
  email: string;
}
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}
