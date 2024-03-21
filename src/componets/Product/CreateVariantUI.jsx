import React, { useContext, useEffect } from "react";
import {
  ColorAndSizeContext,
  ProductContext,
} from "../../context/CreateContext";

const CreateVariantUI = ({ onClick }) => {
  const { handleVarientForm } = useContext(ProductContext).Variant;
  const { sizeAndColor, getColorAndSize } = useContext(ColorAndSizeContext);
  useEffect(() => {
    getColorAndSize();
  }, []);
  return (
    <>
      {sizeAndColor && (
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Color</label>
            <select
              className="form-select"
              name="color_id"
              onChange={handleVarientForm}
            >
              <option value={""}>Select color</option>
              {sizeAndColor.color.map((color, i) => {
                return (
                  <option value={color.color_id} key={i}>
                    {color.color_name}
                  </option>
                );
              })}
              {/* <option value={"yellow"}>Yellow</option> */}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Size</label>
            <select
              className="form-select"
              name="size_id"
              onChange={handleVarientForm}
            >
              <option value={""}>Select Size</option>
              {sizeAndColor.size.map((size, i) => {
                return (
                  <option value={size.size_id} key={i}>
                    {size.size_name}
                  </option>
                );
              })}
              <option value={"yellow"}>Yellow</option>
            </select>
          </div>
          {onClick && (
            <div className="mb-3 m-auto">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={onClick}
              >
                Create
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateVariantUI;
