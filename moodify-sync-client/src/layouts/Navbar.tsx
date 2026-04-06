const Navbar = () => {
  return (
    <>
      <nav className=" mx-auto  max-w-7xl z-50 bg-linear-to-br from-[#07071f] via-[#301a4e] to-[#1e0926]">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl  px-6 py-3 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="font-bold text-white tracking-tight">Moodify</span>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <li className="hover:text-white cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Library
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Discover
            </li>
          </ul>

          {/* Action Button */}
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-4 rounded-full border border-white/10 transition-all">
            Upgrade Pro
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
