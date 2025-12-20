import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import PageTransition from "./PageTransition";

const Layout: FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full m-0 flex-grow">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};

export default Layout