import { Outlet } from "react-router";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
