import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../service/auth.api";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => console.log(error),
  });

  return {
    registerMutation,
  };
};
