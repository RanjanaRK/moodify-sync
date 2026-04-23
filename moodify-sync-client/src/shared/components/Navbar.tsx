import { Upload } from 'lucide-react';
import { Link } from 'react-router';
import { useCurrentUser } from '../../features/auth/hooks/useUser';
import LogoutButton from './LogoutButton';

const Navbar = ({ onOpenSongs }: { onOpenSongs: () => void }) => {
  const { currentUserQuery } = useCurrentUser();
  const user = currentUserQuery.data?.user;
  console.log(user);

  return (
    <>
      <nav className="absolute top-0 left-0 z-50 w-full border-b border-orange-500/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to={'/'}>
            <h1 className="text-2xl font-bold tracking-wide text-white">Moodify Sync</h1>
          </Link>

          <div className="hidden items-center gap-5 text-sm font-medium text-gray-300 md:flex">
            <button onClick={onOpenSongs} className="transition hover:text-orange-400">
              All Songs
            </button>
            <Link to={'/upload'}>
              <Upload />
            </Link>
            <h3 className="font-semibold">{user?.username}</h3>

            <LogoutButton />
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-orange-700/30 to-transparent" />
      </nav>
    </>
  );
};

export default Navbar;
