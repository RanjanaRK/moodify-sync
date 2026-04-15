import type z from "zod";
import type { loginSchema, registerSchema } from "./zodSchema";

export type LoginFormType = z.infer<typeof loginSchema>;
export type RegisterFormType = z.infer<typeof registerSchema>;
