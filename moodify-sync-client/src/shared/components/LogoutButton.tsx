import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { useLogout } from "../../features/auth/hooks/useAuth";
import { LucideLogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { logoutMutation } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="rounded-xl bg-orange-600 px-4 py-2 text-white hover:bg-orange-500 transition-colors disabled:opacity-50"
      >
        {logoutMutation.isPending ? "Logging out..." : <LucideLogOut />}
      </Button>
    </>
  );
};

export default LogoutButton;
