import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
