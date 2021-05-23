import React, { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen scrollbar-thin text-white scrollbar-thumb-gray-700 flex flex-col justify-center items-center bg-gray-900">
      {children}
    </div>
  );
};
export default Layout;
