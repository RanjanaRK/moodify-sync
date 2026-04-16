import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../service/auth.api";
import toast from "react-hot-toast";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      toast.success("Register successfully.");

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
