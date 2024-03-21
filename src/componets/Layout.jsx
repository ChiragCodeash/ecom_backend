import React, { useEffect } from "react";
import SidebarComponet from "./common/SidebarComponet";
import { useNavigate } from "react-router-dom";
{/* <SidebarComponet Componets={<Componets />} /> */}


const Layout = ({ Componets }) => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <SidebarComponet Componets={<Componets />} />
    </>
  );
};

export default Layout;
