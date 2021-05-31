import React, { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-full min-w-full overflow-x-hidden text-white flex flex-col justify-center items-center bg-gray-900">
      {children}
    </div>
  );
};
export default Layout;
