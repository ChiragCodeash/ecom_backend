import React, { Children, useState } from "react";
import { ColorAndSizeContext } from "../CreateContext";

const ColorAndSizeState = ({children}) => {
  const [productColor, setProductColor] = useState();
  const [productSize, setProductSize] = useState();
  const [sizeAndColor, setSizeAndColor] = useState();

  const url = `${import.meta.env.VITE_APP_SERVER_URL}/colorandsize`;

  const getColor = async () => {
    try {
      const response = await fetch(`${url}/color`, {
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

  const getSize = async () => {
    try {
      const response = await fetch(`${url}/size`, {
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

  const getColorAndSize = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status) {
        setSizeAndColor(result.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const DefaultObj = {
    getColor,
    productColor,
    getSize,
    productSize,
    getColorAndSize,
    sizeAndColor,
  };
  return (
    <ColorAndSizeContext.Provider value={DefaultObj}>
      {children}
    </ColorAndSizeContext.Provider>
  );
};

export default ColorAndSizeState;
