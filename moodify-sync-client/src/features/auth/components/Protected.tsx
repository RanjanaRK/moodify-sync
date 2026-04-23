import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useCurrentUser } from '../hooks/useUser';

const Protected = ({ children }: { children: ReactNode }) => {
  const { currentUserQuery } = useCurrentUser();
  const user = currentUserQuery.data?.user;

  console.log(user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default Protected;
