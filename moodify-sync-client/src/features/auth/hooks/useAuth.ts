import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "../service/auth.api";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    registerMutation,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    loginMutation,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: async (data) => {
      toast.success(data.message);

      // await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    logoutMutation,
  };
};
