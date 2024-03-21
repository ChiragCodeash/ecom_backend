import React, { useState } from "react";
import { ColorContext } from "../CreateContext";

const ColorState = ({ children }) => {
  const [productColor, setProductColor] = useState();
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/color`;

  const getColor = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status) {
        setProductColor(result.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const DefaultObj = { productColor , getColor };
  return (
    <ColorContext.Provider value={DefaultObj}>
      {" "}
      {children}
    </ColorContext.Provider>
  );
};

export default ColorState;
