import React from "react";
import { AuthContext } from "../CreateContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthState = ({ children }) => {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/auth`;

//   Registration
  const Registration = async (data) => {
    try {
      const response = await fetch(`${url}/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status) {
        navigate("/login");
        toast.success(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

//   Login API
  const Login = async (data) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status) {
        navigate("/");
        localStorage.setItem("token", result.token);
        toast.success(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const DefaultObj = { Registration , Login };
  return (
    <AuthContext.Provider value={DefaultObj}>{children}</AuthContext.Provider>
  );
};

export default AuthState;
