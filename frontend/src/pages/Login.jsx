import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signin } from "../utils/APIRoute";
import frontImage from "../assets/invoiceImg.jpeg";
import {jwtDecode} from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/userDetails";
import { message } from "antd";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.userData);
   
    const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email } = decoded;

      const response = await axios.post(signin, { name, email });
      const { username } = response.data;

      localStorage.setItem("username", name);
      localStorage.setItem("useremail",email);

      console.log("Sign in successful:", username);
      //storing name and email in Redux store
      dispatch(userAction.userData({name,email}));

      navigate("/home");

    } catch (error) {
      console.error("Sign in error occured");
      message.error("Some error occcured at server side",1.2)
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div style={{ flex:1 }} >
        <img
          src={frontImage}
          alt="Welcome"
          style={{
            height: "100vh",
            objectFit: "cover",
            margin: "0",
            padding: "0",
          }}
        />
      </div>
      <div
      
        className="loginRightPart"
      >
        <div style={{ transform: "scale(1.2)" }}>
          <GoogleOAuthProvider clientId="1026617270799-ac4m3lfuarba592tii7gq5k5p28s31ml.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{
                    backgroundColor: "#4285F4",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Sign in with Google
                </button>
              )}
              theme="filled_blue"
              size="large"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
