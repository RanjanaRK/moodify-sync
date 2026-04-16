import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "../service/auth.api";
import toast from "react-hot-toast";

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
