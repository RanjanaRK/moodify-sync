import { useQuery } from "@tanstack/react-query";
import { getMe } from "../service/user.api";

export const useCurrentUser = () => {
  const currentUserQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  return {
    currentUserQuery,
  };
};
