import axios from "axios";
import type { RegisterFormType } from "../utils/types";

export const register = async (rvalue: RegisterFormType) => {
  const response = await axios.post("/api/auth/register", { rvalue });
  return response;
};
