import React, { useEffect, useState } from "react";
import {
  
  HexColorInput,
  HexColorPicker,
} from "react-colorful";
import "../../assets/css/ColorPicker.css";

const ColorPicker = ({ color, setColor , style }) => {
  const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

  return (
    <>
      <div className="picker" style={{...style}}>
        <HexColorPicker color={color} onChange={setColor} />
        <div className="d-flex">
          <div className="w-50 align-items-center">
            <HexColorInput
              color={color}
              onChange={setColor}
              className="form-control mt-2 w-75 align-center m-auto text-center text-capitalize"
              prefixed
            />
          </div>
          <div className="w-50">
            <div className="picker__swatches align-items-center ms-6">
              Recent : 
              {presetColors.map((presetColor, i) => (
                <button
                  key={i}
                  className="picker__swatch"
                  style={{ background: presetColor }}
                  onClick={() => setColor(presetColor)}
                />
              ))}
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default ColorPicker;
