import React, { useEffect } from "react";
import Layout from "./componets/Layout";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Login from "./componets/pages/Login";
import Registration from "./componets/pages/Registration";
import ResetPass from "./componets/pages/ResetPass";
import Page404 from "./componets/pages/Page404";
import ImageGallery from "./Test";

const App = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  useEffect(() => {
    if (!isLogin) {
      console.log("Run");
      navigate("/login");
    }
  }, []);
  return (
    <>
      <ToastContainer
        stacked
        autoClose={3000}
        position="bottom-right"
        closeOnClick
      />
      <Routes>
        {routes.map((route, index) => {
          if (route.NestedRoutes) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout Componets={route.component} title={route.title} />
                }
              >
                {route.NestedRoutes.map((item, key) => {
                  return (
                    <Route
                      path={item.path}
                      key={key}
                      element={<item.component />}
                    />
                  );
                })}
              </Route>
            );
          } else {
            return (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                element={
                  <Layout Componets={route.component} title={route.title} />
                }
              />
            );
          }
        })}

        <Route
          exact
          path="/login"
          element={isLogin ? <Navigate to={"/"} /> : <Login title="Login" />}
        />
        <Route
          exact
          path="/registration"
          element={
            isLogin ? (
              <Navigate to={"/"} />
            ) : (
              <Registration title="Registration" />
            )
          }
        />
        <Route
          exact
          path="/resetpass"
          element={<ResetPass title="Reset Password" />}
        />
        <Route
          exact
          path="/test"
          element={<ImageGallery title="Reset Password" />}
        />
        <Route path="*" element={<Page404 title="Page not Found" />} />
      </Routes>
    </>
  );
};

export default App;
