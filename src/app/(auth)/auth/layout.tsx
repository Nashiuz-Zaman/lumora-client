// components

import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col max-w-[120rem] mx-auto overflow-x-hidden">
      <main className="flex flex-col grow">{children}</main>
    </div>
  );
};

export default AuthLayout;
