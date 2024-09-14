import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ensure Ant Design styles are imported

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const tellme = await Swal.fire({
      title: "Sure you want to Sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out",
      width: "25rem",
    });

    if (!tellme.isConfirmed) return;

    googleLogout();
    console.log("User logged out.");
    localStorage.clear();
    navigate("/"); // redirecting to login page
  };

  return (
    <div className="flex justify-center items-center m-4">
      <Button
        type="primary"
        icon={<LogoutOutlined className="text-xm font-bold" />}
        onClick={handleLogout}
        className="active:scale-95 transition-transform font-bold"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default LogoutButton;
