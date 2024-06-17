import React from "react";
import { ImageContext } from "../CreateContext";

const ImageState = ({ children }) => {
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/image`;

  const addImage = async (data) => {
    try {
      const response = await fetch(`${url}/uploadimages`, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/",
          token: localStorage.getItem("token"),
        },
        body: data,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const deleteImage = async (data) => {
    try {
      const response = await fetch(`${url}/deleteimage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const updateImage = async (data) => {
    try {
      const response = await fetch(`${url}/updateimages`, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/",
          token: localStorage.getItem("token"),
        },
        body: data,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const DefaultObj = {
    addImage,
    deleteImage,
    updateImage,
  };
  return (
    <ImageContext.Provider value={DefaultObj}>{children}</ImageContext.Provider>
  );
};

export default ImageState;
