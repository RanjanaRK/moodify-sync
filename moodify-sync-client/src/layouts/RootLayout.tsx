import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-bl from-violet-900 to-fuchsia-900 ">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
