import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FileAddOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import LogoutButton from "./LogoutBtn";
import Logo from "../assets/logo.jpg";
import { useSelector } from "react-redux";

const { Sider } = Layout;

const Navbar = () => {
  const location = useLocation(); // Get current path
  const { username, useremail } = useSelector((store) => store.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === "") navigate("/");
  }, []);


  const selectedKey = () => {
    if (location.pathname === "/home") return "home";
    if (location.pathname === "/create-list") return "create-list";
    if (location.pathname === "/invoice-history") return "invoice-history";
    return "";
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "create-list",
      icon: <FileAddOutlined/>,
      label: <Link to="/create-list">Create List</Link>,
    },
    {
      key: "invoice-history",
      icon: <HistoryOutlined />,
      label: <Link to="/invoice-history">Invoice History</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh",maxWidth:"18vw"}}>
      <Sider width={220} theme="dark">
        <div className="logo p-4 flex justify-center items-center">
          <img
            src={Logo}
            alt="Invoice Logo"
            className="w-16 filter invert cursor-pointer"
          />
        </div>
        <p
          className="text-white font-bold text-lg my-5 pl-4"
          style={{ fontFamily: "revert-layer" }}
        >
          Welcome {username}
        </p>
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[selectedKey()]} 
          items={menuItems}
          className="text-base"
          style={{ lineHeight: "64px" }}
        />
        <div className="pt-20 mt-10">
          <LogoutButton />
        </div>
      </Sider>
    </Layout>
  );
};

export default Navbar;
