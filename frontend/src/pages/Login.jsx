import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import { signin } from "../utils/APIRoute";
import frontImage from "../assets/invoiceImg.jpeg";
import { useDispatch } from "react-redux";
import { userAction } from "../store/userDetails";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await axios.post(signin, { email, password });
      const { username } = response.data;

      localStorage.setItem("username", username);
      localStorage.setItem("useremail", email);

      dispatch(userAction.userData({ username, email }));

      message.success("Login successful!", 1.2);
      navigate("/home");
    } catch (error) {
      const errorMsg= error.response?.data?.message;
      message.error(errorMsg, 1.2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1">
        <img src={frontImage} alt="Welcome" className="h-screen object-cover" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-96 p-10 shadow-lg rounded-lg bg-white">
          <Title level={3} className="text-center mb-6">
            Welcome Back
          </Title>
          <Form onFinish={handleLogin} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                size="large"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form.Item>
            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="w-48"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5">
            <Typography.Text>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
