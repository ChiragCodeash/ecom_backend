import React, { useContext } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import IconPack from "./IconPack";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { GlobalContext } from "../../context/CreateContext";

const SidebarComponet = ({ Componets }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed } = useContext(GlobalContext);
  return (
    <>
      <div className="header">
        {/* Navbar */}
        <Navbar />
      </div>

      {/* SideBar */}
      <div style={{ display: "flex" }}>
        <Sidebar
          collapsed={collapsed}
          backgroundColor={"white"}
          rootStyles={
            {
              minHeight: "100vh",
            }
          }
        >
          <div className="d-flex justify-content-center p-4">
            <img src="/assets/images/brand/logo/logo-2.svg" />
          </div>
          <Menu>
            <MenuItem
              icon={<IconPack icon="dashboard" />}
              onClick={() => {
                navigate("/");
              }}
              className={`${
                ["/"].includes(location.pathname) && "fw-bold text-primary"
              }`}
            >
              Dashboard
            </MenuItem>
            <SubMenu
              label="Product"
              icon={<IconPack icon={"product"} />}
              // className={`${
              //   ["/addproduct" ].includes(location.pathname) &&
              //   "fw-bold text-primary"
              // }`}
            >
              <MenuItem
                icon={<IconPack icon={"filladd"} />}
                onClick={() => {
                  navigate("/addproduct");
                }}
                className={`${
                  ["/addproduct"].includes(location.pathname) &&
                  "fw-bold text-primary"
                }`}
              >
                Add Product
              </MenuItem>
              <MenuItem
                icon={<IconPack icon={"filladd"} />}
                onClick={() => {
                  navigate("/viewproduct");
                }}
                className={`${
                  ["/viewproduct"].includes(location.pathname) &&
                  "fw-bold text-primary"
                }`}
              >
                View Product
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Setting"
              icon={
                <IconPack
                  icon={"setting"}
                  
                />
              }
              className={`${
                ["/theme"].includes(location.pathname) &&
                "fw-bold text-primary"
              }`}
            >
              <MenuItem
                icon={<IconPack icon={"theme"} />}
                onClick={() => {
                  navigate("/theme");
                }}
                className={`${
                  ["/theme"].includes(location.pathname) &&
                  "fw-bold text-primary"
                }`}
              >
                Theme
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
        <div className="w-100">
          <div className="app-content-area">
            <div className="container-fluid">{Componets}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponet;
