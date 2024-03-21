import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropZone from "../common/DropZone";
import { useContext } from "react";
import {
  ColorAndSizeContext,
  ProductContext,
} from "../../context/CreateContext";
import CustomeModal from "../common/CustomeModal";
import IconPack from "../common/IconPack";

const AddVarient = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const params = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });
  const { product_id, variant_id } = params;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const { createVariant, varientObj, getAllVariant, deleteVariant } =
    useContext(ProductContext);
  const { varient, handleVarientForm } = useContext(ProductContext).Variant;

  // const handleVarientForm = (e) => {
  //   setVarient({ ...varient, [e.target.name]: e.target.value });
  // };
  const { getColorAndSize, sizeAndColor } = useContext(ColorAndSizeContext);

  useEffect(() => {
    console.log(typeof(product_id))
    if (!product_id ) {
      navigate("/addproduct");
    }
    // GetSingalCategory(category);
    getColorAndSize();
    product_id && getAllVariant(product_id);
  }, []);

  const CreateVarient = () => {
    createVariant({ ...varient, product_id: product_id });
    setShow(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">Create Variant</h4>
              </div>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary btn-icon me-2"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  +
                </button>
                {varientObj &&
                  varientObj.map((varientItem, i) => {
                    return (
                      <span className="btn-group" key={i}>
                        <button
                          type="button"
                          className={`btn  text-uppercase btn-success${
                            variant_id == varientItem.variant_id ? "" : "-soft"
                          }`}
                          onClick={() => {
                            navigate(
                              `/addproduct/createvariant?variant_id=${varientItem.variant_id}&product_id=${product_id}`
                            );
                          }}
                        >
                          Size : {varientItem.size_name}, Color :{" "}
                          {varientItem.color_name}
                        </button>
                        <button
                          className="btn btn-danger-soft me-2"
                          onClick={() => {
                            deleteVariant(varientItem.variant_id, product_id);
                          }}
                        >
                          <IconPack icon={"delete"} />
                        </button>
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
          {!varientObj && (
            <div className="col-12">
              <h4 className="text-danger">*Add At least one variant</h4>
            </div>
          )}
        </div>
        {varientObj && (
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="mb-0">Basic Information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    {/* input */}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Product Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="₹ ___"
                        name="product_price"
                      />
                    </div>
                    {/* input */}

                    <div className="mb-3 col-md-6">
                      <label className="form-label">Sale Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="₹ ___"
                        name="sale_price"
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">SKU ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter SKU ID"
                        name="sku_id"
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="100"
                        name="product_stock"
                      />
                    </div>

                    <div className="mb-3 col-md-6 ">
                      <label className="form-label">Product Weight</label>
                      <span className="text-secondary">(gm)</span>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Enter Product Weight"
                        name="product_weight"
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Product Height</label>
                      <span className="text-secondary">(cm)</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Height"
                        name="product_height"
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Product Width</label>
                      <span className="text-secondary">(cm)</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Width"
                        name="product_width"
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Product Length</label>
                      <span className="text-secondary">(cm)</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Length"
                        name="product_length"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-12">
              <div className="card mb-4">
                <div className="card-body">
                  <DropZone />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-between">
          <button
            onClick={() => {
              navigate(`/addproduct?product_id=${product_id}`);
            }}
            className="btn btn-primary"
          >
            <IconPack icon={"leftarrow"} />
            Back
          </button>
          <button
            onClick={() => {
              SubmitForm();
            }}
            className="btn btn-primary"
          >
            Next
            <IconPack icon={"rightarrow"} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <CustomeModal
        title={"Create Varient"}
        handleClose={handleClose}
        show={show}
        onSubmit={CreateVarient}
      >
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
            {/* <div className="mb-3 col-md-2 m-auto">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={createVarient}
              >
                Create
              </button>
            </div> */}
          </div>
        )}

        {/* <div>
          {varientgp.map((varient, i) => {
            return (
              <button
                type="button"
                key={i}
                className="btn btn-success-soft mb-2 me-2"
                onClick={() => {
                  console.log(sizeAndColor.color);
                  deleteVarient(i);
                }}
              >
                {varient}
              </button>
            );
          })}
        </div>
        <div>
          {varientgp.length ? (
            <span className="username">
              *Click on varient name delete varient
            </span>
          ) : (
            ""
          )}
        </div> */}
      </CustomeModal>
    </>
  );
};

export default AddVarient;
