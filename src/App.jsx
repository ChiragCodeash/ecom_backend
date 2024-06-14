import React, { useEffect } from "react";
import Layout from "./componets/Layout";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./componets/pages/Login";
import Registration from "./componets/pages/Registration";
import ResetPass from "./componets/pages/ResetPass";
import Page404 from "./componets/pages/Page404";
import TagInput from "./componets/common/TagInput";
import Test from "./Test";
import Loading from "./componets/common/Loading";
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
      {/* <Toast message={"Succeess"}/> */}
      <ToastContainer />
      <Routes>
        {/* {routes.map((route, index) => {
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
        })} */}

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
    // <Layout componet={} />
  );
};

export default App;
