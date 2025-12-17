import type { FC } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import PageTransition from "./PageTransition";

const Layout: FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};

export default Layout