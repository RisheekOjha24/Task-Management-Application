import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, HistoryOutlined } from "@ant-design/icons";
import LogoutButton from "./LogoutBtn";
import Logo from "../assets/logo.jpg";
import { useSelector } from "react-redux";

const { Sider } = Layout;

const Navbar = () => {
  const location = useLocation(); // Get current path
  const { username } = useSelector((store) => store.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === "") navigate("/");
  }, [username, navigate]);

  const selectedKey = () => {
    if (location.pathname === "/home") return "home";
    if (location.pathname === "/invoice-history") return "invoice-history";
    return "";
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    }
  ];

  const displayName = username.split(" ")[0];

  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "20vw" }}>
      <Sider
        width={220}
        theme="dark"
        breakpoint="lg"
        collapsedWidth="0"
        className="site-layout-background"
      >
        <Link to={"/home"}>
          <div className="logo flex justify-center flex-col items-center pt-4">
            <img
              src={Logo}
              alt="Invoice Logo"
              className="w-16 filter invert cursor-pointer"
            />
            <h2 className="text-white text-xl font-serif mr-2 tracking-wider">
              Listify
            </h2>
          </div>
        </Link>
        <div className="p-4">
          <p
            className="text-white font-bold text-lg text-center"
            style={{ fontFamily: "revert-layer", wordSpacing: "4px" }}
          >
            Welcome {displayName}
          </p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey()]}
          items={menuItems}
          className="text-base"
          style={{ lineHeight: "64px" }}
        />
        <div className="absolute bottom-0 left-0 p-4">
          <LogoutButton />
        </div>
      </Sider>
    </Layout>
  );
};

export default Navbar;
