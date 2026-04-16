import type z from "zod";
import type { loginSchema, registerSchema } from "./zodSchema";

export type LoginFormType = z.infer<typeof loginSchema>;
export type RegisterFormType = z.infer<typeof registerSchema>;

export type User = {
  _id: string;
  username: string;
  email: string;
  createdAt?: string;
};

export type CurrentUserResponse = {
  success: boolean;
  message: string;
  user: User;
};
