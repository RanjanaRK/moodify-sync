import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useCurrentUser } from '../hooks/useUser';
import { Loader2 } from 'lucide-react';

const Protected = ({ children }: { children: ReactNode }) => {
  const { currentUserQuery } = useCurrentUser();
  const user = currentUserQuery.data?.user;

  if (currentUserQuery.isLoading) {
    return (
      <>
        <Loader2 className="animate-spin" />
      </>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default Protected;
