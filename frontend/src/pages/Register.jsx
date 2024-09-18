import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import { signup } from "../utils/APIRoute"; // Assuming signup is the API endpoint for registration
import frontImage from "../assets/invoiceImg.jpeg";

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const { username, useremail, password } = values;
      await axios.post(signup, { username, useremail, password });

      message.success("Registration successful!", 1.2);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      console.log(error.response);
      message.error(errorMessage, 1.2);
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
            Create Account
          </Title>
          <Form onFinish={handleRegister} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                size="large"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="useremail"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
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
                {
                  min: 4,
                  message: "Password must be at least 4 characters long!",
                },
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5">
            <Typography.Text>
              Already have an account? <Link to="/">Log in</Link>
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
