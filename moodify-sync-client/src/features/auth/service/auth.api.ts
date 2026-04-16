import { api } from "../../../shared/lib/api";
import type { RegisterFormType } from "../utils/types";

export const register = async (rvalue: RegisterFormType) => {
  try {
    const response = await api.post("/api/auth/register", { rvalue });
    return response;
  } catch (error) {
    console.log(error);
  }
};
