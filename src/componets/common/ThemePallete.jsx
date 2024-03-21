import React from "react";

const ThemePallete = ({ themePallete, HandleActive, active }) => {
  return (
    <>
      <div
        className=" d-flex h-100 gap-2"
        style={{ borderRadius: "9px" }}
      >
        <div
          className={`w-100 color-box ${active == "text" && "active"}`}
          style={{ background: themePallete.text }}
          onClick={() => {
            HandleActive("text");
          }}
        >
          <a className="color-info" name="text">
            {themePallete.text}
          </a>
          <div className="bg-dark  p-2 text-center text-light">Text</div>
        </div>
        <div
          className={`w-100 color-box ${active == "body" && "active"}`}
          style={{ background: themePallete.body }}
          onClick={() => {
            HandleActive("body");
          }}
        >
          <a className="color-info" name="text">
            {themePallete.body}
          </a>
          <div className="bg-dark  p-2 text-center text-light">Body</div>
        </div>
        <div
          className={`w-100 color-box ${active == "primary" && "active"}`}
          style={{ background: themePallete.primary }}
          onClick={() => {
            HandleActive("primary");
          }}
        >
          <a className="color-info" name="text">
            {themePallete.primary}
          </a>
          <div className="bg-dark  p-2 text-center text-light">Primary</div>
        </div>
        <div
          className={`w-100 color-box ${active == "secondary" && "active"}`}
          style={{ background: themePallete.secondary }}
          onClick={() => {
            HandleActive("secondary");
          }}
        >
          <a className="color-info" name="text">
            {themePallete.secondary}
          </a>
          <div className="bg-dark  p-2 text-center text-light">Secondary</div>
        </div>
        <div
          className={`w-100 color-box ${active == "light" && "active"}`}
          style={{ background: themePallete.light }}
          onClick={() => {
            HandleActive("light");
          }}
        >
          <a className="color-info" name="text">
            {themePallete.light}
          </a>
          <div className="bg-dark  p-2 text-center text-light">Light</div>
        </div>
        <div
          className={`w-100 color-box ${active == "dark" && "active"}`}
          style={{ background: themePallete.dark }}
          onClick={() => {
            HandleActive("dark");
          }}
        >
          <a className="color-info" name="text">
            {themePallete.dark}
          </a>
          <div className="bg-dark  p-2 text-center text-light">Dark</div>
        </div>
      </div>
    </>
  );
};

export default ThemePallete;
