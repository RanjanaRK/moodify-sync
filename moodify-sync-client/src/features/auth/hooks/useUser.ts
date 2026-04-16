import { useQuery } from "@tanstack/react-query";
import { getMe } from "../service/auth.api";

export const useCurrentUser = () => {
  const currentUserQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    currentUserQuery,
  };
};
