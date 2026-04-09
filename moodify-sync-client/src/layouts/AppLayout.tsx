import { Outlet } from "react-router";
import Navbar from "../shared/components/Navbar";

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
