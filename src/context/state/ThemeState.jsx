import React, { useState } from "react";
import { ThemeContext } from "../CreateContext";
import { toast } from "react-toastify";

const ThemeState = ({ children }) => {
  const [themePallete, setThemePallete] = useState();
  const [themeCounter, setThemeCounter] = useState(1);
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/theme`;

  const getTheme = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setThemePallete(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };





  const updateTheme = async ({ themePallete }) => {
    try {
      const response = await fetch(`${url}/updatetheme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            theme_obj : themePallete
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        setThemeCounter(themeCounter + 1);
        toast.success(data.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.warning(data.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.warning(error.message, {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const DefaultObj = {
    getTheme,
    themePallete,
    setThemePallete,
    updateTheme,
    themeCounter,
  };
  return (
    <ThemeContext.Provider value={DefaultObj}>{children}</ThemeContext.Provider>
  );
};

export default ThemeState;
