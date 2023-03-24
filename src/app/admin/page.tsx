"use client";

import { useForm } from "react-hook-form";
import { useAdminStore } from "./store";
import LoginComponent from "./loginComponent";

const AdminPage = () => {
  const isLogin = useAdminStore((state) => state.isLogin);

  const getComponent = () => {
    if (isLogin) {
      return <div>Admin Page</div>;
    } else {
      return <LoginComponent />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center flex-1 justify-center h-screen font-poppins">
      {getComponent()}
    </div>
  );
};

export default AdminPage;
