import { Link } from "react-router";
import { useCurrentUser } from "../../features/auth/hooks/useUser";

const Navbar = () => {
  const { currentUserQuery } = useCurrentUser();
  const user = currentUserQuery.data?.user;
  console.log(user);

  return (
    <>
      <nav className="w-full absolute top-0 left-0 z-50 bg-black/40 backdrop-blur-md border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Moodify Sync
          </h1>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link
              to="/profile"
              className="hover:text-orange-400 transition-colors"
            >
              {user?.username}
            </Link>
          </div>

          {/* CTA */}
          {/* <button className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300">
            Profile
          </button> */}
        </div>

        {/* bottom border glow */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-orange-700/30 to-transparent" />
      </nav>
    </>
  );
};

export default Navbar;
