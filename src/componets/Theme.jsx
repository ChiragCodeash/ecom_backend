import React, { useContext, useEffect, useState } from "react";
import ColorPicker from "./common/ColorPicker";
import { ThemeContext } from "../context/CreateContext";
import ThemePallete from "./common/ThemePallete";
const Theme = () => {
  const [active, setActive] = useState("text");
  const { getTheme, themePallete, setThemePallete, themeCounter, updateTheme } =
    useContext(ThemeContext);
  useEffect(() => {
    getTheme();
  }, [themeCounter]);

  const [color, setColor] = useState();

  useEffect(() => {
    setThemePallete({ ...themePallete, [active]: color });
  }, [color]);

  const HandleActive = (key) => {
    setColor(themePallete[key]);
    setActive(key);
  };

  return (
    <>
      {themePallete && (
        <>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              {/* Page header */}
              <div className="d-flex justify-content-between mb-5 align-items-center">
                <h3 className="mb-0 ">Customize Website</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12 col-12 mb-5">
              <div className="">
                <ColorPicker
                  color={color}
                  setColor={setColor}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-xl-6 col-md-12 col-12 mb-5">
              <ThemePallete
                active={active}
                themePallete={themePallete && themePallete}
                HandleActive={HandleActive}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log(themePallete);
              updateTheme({ themePallete });
            }}
          >
            Click Me
          </button>
        </>
      )}
    </>
  );
};

export default Theme;
