import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-black via-[#270901] to-black">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
