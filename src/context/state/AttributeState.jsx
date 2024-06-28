import React, { Children, useState } from "react";
import { AttributeContext } from "../CreateContext";
import { toast } from "react-toastify";

const AttributeState = ({ children }) => {
  const [productColor, setProductColor] = useState();
  const [productSize, setProductSize] = useState();
  const [sizeAndColor, setSizeAndColor] = useState();
  const [fabric, setFabric] = useState();
  const [occasion, setOccasion] = useState();
  const [style, setStyle] = useState();

  // const url = `${import.meta.env.VITE_APP_SERVER_URL}/colorandsize`;
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/attributes`;

  const getColor = async () => {
    try {
      const response = await fetch(`${url}/color`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      if (result.status) {
        setProductColor(result.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getSize = async () => {
    try {
      const response = await fetch(`${url}/size`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      if (result.status) {
        setProductSize(result.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getColorAndSize = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      if (result.status) {
        setSizeAndColor(result.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const addColor = async (colors) => {
    try {
      const response = await fetch(`${url}/addcolor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ colors }),
      });
      const result = await response.json();

      if (result.status) {
        setSizeAndColor({ size: sizeAndColor.size, color: result.data });
        toast.success(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
        return true;
      } else {
        toast.error(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
        return false;
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  };

  const addSize = async (sizes) => {
    try {
      const response = await fetch(`${url}/addsize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ sizes }),
      });
      const result = await response.json();

      if (result.status) {
        setSizeAndColor({ color: sizeAndColor.color, size: result.data });
        toast.success(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
        return true;
      } else {
        toast.error(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
        return false;
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  };

  const GetAttribute = async () => {
    try {
      const response = await fetch(`${url}/getattribute`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      if (result.status) {
        setFabric(result.data["fabric"]);
        setStyle(result.data["style"]);
        setOccasion(result.data["occasion"]);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error");
    }
  };

  const DefaultObj = {
    getColor,
    productColor,
    getSize,
    productSize,
    getColorAndSize,
    sizeAndColor,
    addColor,
    addSize,
    GetAttribute,
    fabric,
    style,
    occasion,
  };
  return (
    <AttributeContext.Provider value={DefaultObj}>
      {children}
    </AttributeContext.Provider>
  );
};

export default AttributeState;
