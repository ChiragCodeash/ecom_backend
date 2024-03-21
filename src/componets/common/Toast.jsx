import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({
  message,
  position,
  autoClose,
  hideProgressBar,
  closeOnClick,
  pauseOnHover,
  draggable,
  progress,
  theme,
  type,
  status
}) => {
  const ToastObject = {
    position: position || "top-right",
    autoClose: autoClose || 5000,
    hideProgressBar: hideProgressBar || false,
    closeOnClick: closeOnClick || true,
    pauseOnHover: pauseOnHover || true,
    draggable: draggable || true,
    progress: progress || undefined,
    theme: theme || "light",
  };

  toast[type || "success"](message, ToastObject);
  return (
    <>
      {status && <ToastContainer />}
    </>
  );
};

export default Toast;
