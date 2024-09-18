import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import sweetAlert from "./sweetNotification";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const tellme = await sweetAlert("Log Out");
    console.log(tellme);
    if (!tellme.isConfirmed) return;

    googleLogout();
    console.log("User logged out.");
    localStorage.removeItem("username");
     localStorage.removeItem("useremail");

    navigate("/");
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
