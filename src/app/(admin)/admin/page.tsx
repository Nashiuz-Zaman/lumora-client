export const metadata = {
  title: "Home | Admin Panel",
};

const AdminHomePage = () => {
  return (
    <div className="min-h-full grid place-content-center">
      <p className="text-2xl text-center">
        Welcome to <span className="text-primary font-bold">Admin</span>{" "}
        Dashboard
      </p>
    </div>
  );
};

export default AdminHomePage;
