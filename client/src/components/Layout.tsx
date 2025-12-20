import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import PageTransition from "./PageTransition";

const Layout: FC = () => {
  return (
    <div className="flex min-h-screen m-0 p-0 ">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full m-0 flex-grow dark:--color-text">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};

export default Layout