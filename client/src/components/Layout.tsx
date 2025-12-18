import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import PageTransition from "./PageTransition";

const Layout: FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full m-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};

export default Layout