import axios from "axios";
import { api } from "../../../shared/lib/api";
import type { LoginFormType, RegisterFormType } from "../utils/types";

export const register = async (rvalue: RegisterFormType) => {
  try {
    const response = await api.post("/api/auth/register", {
      username: rvalue.username,
      email: rvalue.email,
      password: rvalue.password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }

    throw new Error("Something went wrong");
  }
};

export const login = async (lvalue: LoginFormType) => {
  try {
    const response = await api.post("/api/auth/login", {
      email: lvalue.email,
      password: lvalue.password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }

    throw new Error("Something went wrong");
  }
};
