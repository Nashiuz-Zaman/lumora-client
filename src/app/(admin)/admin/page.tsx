import { Suspense } from "react";

export const metadata = {
  title: "Home | Admin Panel",
};

const AdminHomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-full grid place-content-center">
        <p className="text-2xl text-center">
          Welcome to <span className="text-primary font-bold">Admin</span>{" "}
          Dashboard
        </p>
      </div>
    </Suspense>
  );
};

export default AdminHomePage;
