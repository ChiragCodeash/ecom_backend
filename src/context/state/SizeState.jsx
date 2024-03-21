import React, { useState } from "react";
import { SizeContext } from "../CreateContext";

const SizeState = ({ children }) => {
  const [productSize, setProductSize] = useState();
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/size`;

  const getSize = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status) {
        setProductSize(result.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const DefaultObj = { productSize, getSize };
  return (
    <SizeContext.Provider value={DefaultObj}> {children}</SizeContext.Provider>
  );
};

export default SizeState;
